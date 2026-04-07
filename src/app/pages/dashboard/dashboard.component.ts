import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { SupabaseService, Meal } from '../../services/supabase.service';

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
  tdee = signal(2000);
  totalCalories = signal(0);
  remainingCalories = signal(2000);
  totalProtein = signal(0);
  totalCarbs = signal(0);
  totalFat = signal(0);
  todayMeals = signal<Meal[]>([]);
  caloriePercent = signal(0);

  // Pie chart
  pieChartData = signal<ChartConfiguration<'pie'>['data']>({
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
      },
    ],
  });

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  // Line chart
  lineChartData = signal<ChartConfiguration<'line'>['data']>({
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Calories',
        borderColor: '#667eea',
        backgroundColor: 'rgba(102,126,234,0.15)',
        fill: true,
        tension: 0.4,
      },
    ],
  });

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  async loadDashboard() {
    this.loading.set(true);
    try {
      const [meals, weeklyData] = await Promise.all([
        this.supabase.getTodayMeals(),
        this.loadWeeklyData(),
      ]);

      this.todayMeals.set(meals);
      this.calculateTotals(meals);
      this.updateWeeklyChart(weeklyData);
    } catch (err) {
      console.error('Failed to load dashboard', err);
    } finally {
      this.loading.set(false);
    }
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
    this.remainingCalories.set(Math.max(0, this.tdee() - Math.round(calories)));
    this.caloriePercent.set(Math.min(100, Math.round((calories / this.tdee()) * 100)));

    this.pieChartData.set({
      labels: ['Protein', 'Carbs', 'Fat'],
      datasets: [
        {
          data: [Math.round(protein), Math.round(carb), Math.round(fat)],
          backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        },
      ],
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
    this.lineChartData.set({
      labels: weeklyData.labels,
      datasets: [
        {
          data: weeklyData.data,
          label: 'Calories',
          borderColor: '#667eea',
          backgroundColor: 'rgba(102,126,234,0.15)',
          fill: true,
          tension: 0.4,
        },
      ],
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
    } catch (err) {
      console.error('Failed to delete meal', err);
    } finally {
      this.deletingMealId.set(null);
    }
  }

  async logout() {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }
}
