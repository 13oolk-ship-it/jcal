import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SupabaseService, Food } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-manage-foods',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './manage-foods.component.html',
  styleUrl: './manage-foods.component.css',
})
export class ManageFoodsComponent implements OnInit {
  foods = signal<Food[]>([]);
  filteredFoods = signal<Food[]>([]);
  loading = signal(true);
  searchQuery = '';

  // Edit state
  editingFood = signal<Food | null>(null);
  editForm = { name: '', calories: 0, protein: 0, carb: 0, fat: 0 };
  saving = signal(false);

  // Delete state
  foodToDelete = signal<Food | null>(null);
  deleting = signal(false);

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.loadFoods();
  }

  async loadFoods() {
    this.loading.set(true);
    try {
      const foods = await this.supabase.getFoods();
      this.foods.set(foods);
      this.applyFilter();
    } catch (err) {
      console.error('Failed to load foods', err);
    } finally {
      this.loading.set(false);
    }
  }

  applyFilter() {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) {
      this.filteredFoods.set(this.foods());
    } else {
      this.filteredFoods.set(this.foods().filter(f => f.name.toLowerCase().includes(q)));
    }
  }

  // ─── Edit ────────────────────────────────────────
  startEdit(food: Food) {
    this.editingFood.set(food);
    this.editForm = {
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carb: food.carb,
      fat: food.fat,
    };
  }

  cancelEdit() {
    this.editingFood.set(null);
  }

  async saveEdit() {
    const food = this.editingFood();
    if (!food?.id || !this.editForm.name.trim()) return;

    this.saving.set(true);
    try {
      const updated = await this.supabase.updateFood(food.id, {
        name: this.editForm.name.trim(),
        calories: this.editForm.calories,
        protein: this.editForm.protein,
        carb: this.editForm.carb,
        fat: this.editForm.fat,
      });
      this.foods.update(list => list.map(f => f.id === food.id ? updated : f));
      this.applyFilter();
      this.editingFood.set(null);
      this.toast.success('Food updated!');
    } catch (err) {
      console.error('Failed to update food', err);
      this.toast.error('Failed to update');
    } finally {
      this.saving.set(false);
    }
  }

  // ─── Delete ──────────────────────────────────────
  confirmDelete(food: Food) {
    this.foodToDelete.set(food);
  }

  cancelDelete() {
    this.foodToDelete.set(null);
  }

  async deleteFood() {
    const food = this.foodToDelete();
    if (!food?.id) return;

    this.deleting.set(true);
    try {
      await this.supabase.deleteFood(food.id);
      this.foods.update(list => list.filter(f => f.id !== food.id));
      this.applyFilter();
      this.foodToDelete.set(null);
      this.toast.success('Food deleted');
    } catch (err) {
      console.error('Failed to delete food', err);
      this.toast.error('Failed to delete — food may be used in meals');
    } finally {
      this.deleting.set(false);
    }
  }
}
