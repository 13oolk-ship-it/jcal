import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { SupabaseService, Meal, Profile, Workout, WeightLog } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';
import { I18nService, Lang } from '../../services/i18n.service';
import { ThemeService, ThemeId } from '../../services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    BaseChartDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  loading = signal(true);
  mealToDelete = signal<Meal | null>(null);
  deletingMealId = signal<number | null>(null);
  profile = signal<Profile | null>(null);
  tdee = signal(2000);
  bmr = signal(0);
  totalCalories = signal(0);
  remainingCalories = signal(2000);
  totalProtein = signal(0);
  totalCarbs = signal(0);
  totalFat = signal(0);
  todayMeals = signal<Meal[]>([]);
  todayWorkouts = signal<Workout[]>([]);
  totalBurned = signal(0);
  caloriePercent = signal(0);
  today = new Date();

  // Weight tracking
  weightLogs = signal<WeightLog[]>([]);
  todayWeight = signal<number | null>(null);
  savingWeight = signal(false);
  weightChange = computed(() => {
    const logs = this.weightLogs();
    if (logs.length < 2) return 0;
    return +(logs[logs.length - 1].weight - logs[0].weight).toFixed(1);
  });

  // Computed profile helpers
  avatarUrl = computed(() => this.profile()?.avatar_url ?? null);
  genderLabel = computed(() => {
    const g = this.profile()?.gender ?? '';
    const key = g === 'male' ? 'dash.gender.male' : g === 'female' ? 'dash.gender.female' : '';
    return key ? this.i18n.t(key) : '—';
  });
  goalLabel = computed(() => {
    const map: Record<string, string> = { lose: 'dash.goal.lose', maintain: 'dash.goal.maintain', gain: 'dash.goal.gain' };
    const key = map[this.profile()?.goal_type ?? ''];
    return key ? this.i18n.t(key) : '—';
  });
  goalIcon = computed(() => {
    const map: Record<string, string> = { lose: 'trending_down', maintain: 'balance', gain: 'trending_up' };
    return map[this.profile()?.goal_type ?? ''] ?? 'flag';
  });
  activityLabel = computed(() => {
    const map: Record<string, string> = { sedentary: 'dash.activity.sedentary', light: 'dash.activity.light', moderate: 'dash.activity.moderate', active: 'dash.activity.active' };
    const key = map[this.profile()?.activity_level ?? ''];
    return key ? this.i18n.t(key) : '—';
  });
  bmiValue = computed(() => {
    const p = this.profile();
    if (!p?.weight || !p?.height) return 0;
    return +(p.weight / ((p.height / 100) ** 2)).toFixed(1);
  });
  bmiCategory = computed(() => {
    const v = this.bmiValue();
    if (v === 0) return '';
    if (v < 18.5) return this.i18n.t('dash.bmi.underweight');
    if (v < 25) return this.i18n.t('dash.bmi.normal');
    if (v < 30) return this.i18n.t('dash.bmi.overweight');
    return this.i18n.t('dash.bmi.obese');
  });
  bmiColor = computed(() => {
    const v = this.bmiValue();
    if (v < 18.5) return '#0984e3';
    if (v < 25) return '#00b894';
    if (v < 30) return '#fdcb6e';
    return '#d63031';
  });

  // Macro targets (rough split: 30% protein, 40% carbs, 30% fat)
  proteinTarget = computed(() => Math.round((this.tdee() * 0.30) / 4));
  carbsTarget = computed(() => Math.round((this.tdee() * 0.40) / 4));
  fatTarget = computed(() => Math.round((this.tdee() * 0.30) / 9));
  proteinPercent = computed(() => Math.min(100, Math.round((this.totalProtein() / Math.max(1, this.proteinTarget())) * 100)));
  carbsPercent = computed(() => Math.min(100, Math.round((this.totalCarbs() / Math.max(1, this.carbsTarget())) * 100)));
  fatPercent = computed(() => Math.min(100, Math.round((this.totalFat() / Math.max(1, this.fatTarget())) * 100)));

  // Doughnut chart
  doughnutChartData = signal<ChartConfiguration<'doughnut'>['data']>({
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#00b894', '#0984e3', '#e17055'],
      borderWidth: 0,
      spacing: 2,
    }],
  });

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: { display: false },
    },
  };

  // Bar chart (weekly)
  barChartData = signal<ChartConfiguration<'bar'>['data']>({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: 'rgba(108,92,231,.25)',
      borderColor: '#6c5ce7',
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    }],
  });

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,.04)' },
        ticks: { font: { size: 11 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
    },
  };

  // Weight chart (line)
  weightChartData = signal<ChartConfiguration<'line'>['data']>({
    labels: [],
    datasets: [{
      data: [],
      borderColor: '#e84393',
      backgroundColor: 'rgba(232, 67, 147, .08)',
      borderWidth: 2.5,
      pointBackgroundColor: '#e84393',
      pointRadius: 3,
      pointHoverRadius: 5,
      fill: true,
      tension: 0.35,
    }],
  });

  weightChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        grid: { color: 'rgba(0,0,0,.04)' },
        ticks: { font: { size: 11 }, callback: (v) => v + ' kg' },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 }, maxRotation: 0 },
      },
    },
  };

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private toast: ToastService,
    public i18n: I18nService,
    public themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  async loadDashboard() {
    this.loading.set(true);
    try {
      const [meals, weeklyData, profile, workouts] = await Promise.all([
        this.supabase.getTodayMeals(),
        this.loadWeeklyData(),
        this.supabase.getProfile(),
        this.supabase.getTodayWorkouts(),
      ]);

      if (profile) {
        this.profile.set(profile);
        if (profile.language) {
          this.i18n.setLang(profile.language);
        }
        if (profile.theme) {
          this.themeService.setTheme(profile.theme);
        }
        if (profile.weight && profile.height && profile.age && profile.activity_level && profile.goal_type) {
          const { tdee, bmr } = this.calculateTDEE(profile.weight, profile.height, profile.age, profile.gender ?? 'male', profile.activity_level, profile.goal_type);
          this.tdee.set(tdee);
          this.bmr.set(bmr);
        }
      }

      this.todayMeals.set(meals);
      this.todayWorkouts.set(workouts);
      const burned = workouts.reduce((sum, w) => sum + w.calories_burned, 0);
      this.totalBurned.set(burned);
      this.calculateTotals(meals);
      this.updateWeeklyChart(weeklyData);

      // Load weight tracking data
      this.loadWeightData();
    } catch (err) {
      console.error('Failed to load dashboard', err);
    } finally {
      this.loading.set(false);
    }
  }

  private calculateTDEE(weight: number, height: number, age: number, gender: string, activity: string, goal: string): { tdee: number; bmr: number } {
    // Mifflin-St Jeor: Male +5, Female -161
    const genderOffset = gender === 'female' ? -161 : 5;
    const bmr = 10 * weight + 6.25 * height - 5 * age + genderOffset;
    const multipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };
    let tdee = Math.round(bmr * (multipliers[activity] ?? 1.2));
    if (goal === 'lose') tdee -= 500;
    if (goal === 'gain') tdee += 300;
    return { tdee: Math.max(1200, tdee), bmr: Math.round(bmr) };
  }

  private calculateTotals(meals: Meal[]) {
    let calories = 0, protein = 0, carb = 0, fat = 0;

    for (const meal of meals) {
      for (const item of meal.meal_items ?? []) {
        const food = item.food;
        if (!food) continue;
        const qty = item.quantity;
        calories += food.calories * qty;
        protein += food.protein * qty;
        carb += food.carb * qty;
        fat += food.fat * qty;
      }
    }

    this.totalCalories.set(Math.round(calories));
    this.totalProtein.set(Math.round(protein));
    this.totalCarbs.set(Math.round(carb));
    this.totalFat.set(Math.round(fat));
    // Remaining = goal - eaten + burned (exercise earns back calories)
    const netCalories = Math.round(calories) - this.totalBurned();
    this.remainingCalories.set(Math.max(0, this.tdee() - netCalories));
    this.caloriePercent.set(Math.min(100, Math.round((netCalories / this.tdee()) * 100)));

    this.doughnutChartData.set({
      labels: ['Protein', 'Carbs', 'Fat'],
      datasets: [{
        data: [Math.round(protein), Math.round(carb), Math.round(fat)],
        backgroundColor: ['#00b894', '#0984e3', '#e17055'],
        borderWidth: 0,
        spacing: 2,
      }],
    });
  }

  private async loadWeeklyData(): Promise<{ labels: string[]; data: number[] }> {
    const today = new Date();
    const labels: string[] = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);

    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      labels.push(dayNames[d.getDay()]);
    }

    const startStr = startDate.toISOString().split('T')[0];
    const endStr = today.toISOString().split('T')[0];
    const meals = await this.supabase.getMealsForDateRange(startStr, endStr);

    const dailyCalories: Record<string, number> = {};
    for (const meal of meals) {
      const date = meal.created_at?.split('T')[0] ?? '';
      if (!dailyCalories[date]) dailyCalories[date] = 0;
      for (const item of meal.meal_items ?? []) {
        if (item.food) {
          dailyCalories[date] += item.food.calories * item.quantity;
        }
      }
    }

    const data: number[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const key = d.toISOString().split('T')[0];
      data.push(Math.round(dailyCalories[key] ?? 0));
    }

    return { labels, data };
  }

  private updateWeeklyChart(weeklyData: { labels: string[]; data: number[] }) {
    this.barChartData.set({
      labels: weeklyData.labels,
      datasets: [{
        data: weeklyData.data,
        backgroundColor: weeklyData.data.map((_, i) =>
          i === weeklyData.data.length - 1 ? 'rgba(108,92,231,.7)' : 'rgba(108,92,231,.2)'
        ),
        borderColor: '#6c5ce7',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }],
    });
  }

  getMealIcon(type: string): string {
    switch (type) {
      case 'breakfast': return 'free_breakfast';
      case 'lunch': return 'lunch_dining';
      case 'dinner': return 'dinner_dining';
      case 'snack': return 'cookie';
      default: return 'restaurant';
    }
  }

  formatThaiTime(utcStr?: string): string {
    if (!utcStr) return '';
    // Ensure the timestamp is treated as UTC if no timezone info present
    let isoStr = utcStr;
    if (!isoStr.endsWith('Z') && !/[+-]\d{2}:\d{2}$/.test(isoStr)) {
      isoStr += 'Z';
    }
    return new Date(isoStr).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Bangkok',
    });
  }

  getMealCalories(meal: Meal): number {
    let total = 0;
    for (const item of meal.meal_items ?? []) {
      if (item.food) total += item.food.calories * item.quantity;
    }
    return Math.round(total);
  }

  confirmDelete(meal: Meal) {
    this.mealToDelete.set(meal);
  }

  cancelDelete() {
    this.mealToDelete.set(null);
  }

  async deleteMeal() {
    const meal = this.mealToDelete();
    if (!meal?.id) return;

    this.deletingMealId.set(meal.id);
    try {
      await this.supabase.deleteMeal(meal.id);
      // Remove from local list and recalculate
      const updated = this.todayMeals().filter(m => m.id !== meal.id);
      this.todayMeals.set(updated);
      this.calculateTotals(updated);
      this.mealToDelete.set(null);
      this.toast.success(this.i18n.t('dash.mealDeleted'));
    } catch (err) {
      console.error('Failed to delete meal', err);
      this.toast.error(this.i18n.t('dash.failedDeleteMeal'));
    } finally {
      this.deletingMealId.set(null);
    }
  }

  // ─── Weight Tracking ─────────────────────────────
  private async loadWeightData() {
    try {
      const [logs, todayLog] = await Promise.all([
        this.supabase.getWeightLogs(30),
        this.supabase.getTodayWeightLog(),
      ]);
      this.weightLogs.set(logs);
      this.todayWeight.set(todayLog?.weight ?? null);
      this.updateWeightChart(logs);
    } catch (err) {
      console.error('Failed to load weight data', err);
    }
  }

  private updateWeightChart(logs: WeightLog[]) {
    if (logs.length < 1) return;
    const labels = logs.map(l => {
      const d = new Date(l.date + 'T00:00:00');
      return `${d.getDate()}/${d.getMonth() + 1}`;
    });
    this.weightChartData.set({
      labels,
      datasets: [{
        data: logs.map(l => +l.weight),
        borderColor: '#e84393',
        backgroundColor: 'rgba(232, 67, 147, .08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#e84393',
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: true,
        tension: 0.35,
      }],
    });
  }

  async saveWeight(input: HTMLInputElement | Event) {
    const el = input instanceof HTMLInputElement ? input : (input as KeyboardEvent).target as HTMLInputElement;
    const val = parseFloat(el.value);
    if (!val || val < 20 || val > 400) return;
    this.savingWeight.set(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      await this.supabase.upsertWeightLog(val, today);
      this.todayWeight.set(val);
      // Also update profile weight
      await this.supabase.upsertProfile({ weight: val });
      const p = this.profile();
      if (p) this.profile.set({ ...p, weight: val });
      this.toast.success(this.i18n.t('dash.weightSaved'));
      await this.loadWeightData();
    } catch (err) {
      console.error('Failed to save weight', err);
      this.toast.error(this.i18n.t('dash.weightSaveError'));
    } finally {
      this.savingWeight.set(false);
    }
  }

  async switchLanguage(lang: Lang) {
    this.i18n.setLang(lang);
    try {
      await this.supabase.upsertProfile({ language: lang });
    } catch (err) {
      console.error('Failed to save language preference', err);
    }
  }

  async switchTheme(id: ThemeId) {
    this.themeService.setTheme(id);
    try {
      await this.supabase.upsertProfile({ theme: id });
    } catch (err) {
      console.error('Failed to save theme preference', err);
    }
  }

  async logout() {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }
}
