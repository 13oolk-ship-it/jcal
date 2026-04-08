import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupabaseService, Food } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';
import { I18nService } from '../../services/i18n.service';

interface MealEntry {
  foodId: number;
  quantity: number;
}

@Component({
  selector: 'app-add-meal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-meal.component.html',
  styleUrl: './add-meal.component.css',
})
export class AddMealComponent implements OnInit {
  mealType = 'breakfast';
  foods = signal<Food[]>([]);
  entries = signal<MealEntry[]>([{ foodId: 0, quantity: 1 }]);
  loading = signal(false);
  loadingFoods = signal(true);
  errorMessage = signal('');

  mealTypes = [
    { value: 'breakfast', labelKey: 'meal.breakfast', icon: 'free_breakfast' },
    { value: 'lunch', labelKey: 'meal.lunch', icon: 'lunch_dining' },
    { value: 'dinner', labelKey: 'meal.dinner', icon: 'dinner_dining' },
    { value: 'snack', labelKey: 'meal.snack', icon: 'cookie' },
  ];

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private toast: ToastService,
    public i18n: I18nService,
  ) {}

  ngOnInit() {
    this.loadFoods();
  }

  async loadFoods() {
    try {
      const foods = await this.supabase.getFoods();
      this.foods.set(foods);
    } catch (err) {
      console.error('Failed to load foods', err);
    } finally {
      this.loadingFoods.set(false);
    }
  }

  addEntry() {
    this.entries.update(list => [...list, { foodId: 0, quantity: 1 }]);
  }

  removeEntry(index: number) {
    this.entries.update(list => list.filter((_, i) => i !== index));
  }

  getFoodName(foodId: number): string {
    return this.foods().find(f => f.id === foodId)?.name ?? '';
  }

  getFood(foodId: number): Food | undefined {
    return this.foods().find(f => f.id === foodId);
  }

  incrementQty(index: number) {
    this.entries.update(list =>
      list.map((e, i) => i === index ? { ...e, quantity: Math.round((e.quantity + 0.5) * 10) / 10 } : e)
    );
  }

  decrementQty(index: number) {
    this.entries.update(list =>
      list.map((e, i) => i === index ? { ...e, quantity: Math.max(0.1, Math.round((e.quantity - 0.5) * 10) / 10) } : e)
    );
  }

  getTotalCalories(): number {
    let total = 0;
    for (const entry of this.entries()) {
      const food = this.foods().find(f => f.id === entry.foodId);
      if (food) total += food.calories * entry.quantity;
    }
    return Math.round(total);
  }

  async onSubmit() {
    const validEntries = this.entries().filter(e => e.foodId && e.quantity > 0);
    if (validEntries.length === 0) {
      this.errorMessage.set(this.i18n.t('meal.addOneFoodItem'));
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      const meal = await this.supabase.addMeal(this.mealType);

      for (const entry of validEntries) {
        await this.supabase.addMealItem(meal.id!, entry.foodId, entry.quantity);
      }

      this.toast.success(this.i18n.t('meal.mealLogged'));
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to log meal';
      this.errorMessage.set(message);
    } finally {
      this.loading.set(false);
    }
  }
}
