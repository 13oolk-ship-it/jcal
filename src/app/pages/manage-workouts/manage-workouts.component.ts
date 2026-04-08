import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SupabaseService, Workout } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-manage-workouts',
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
  templateUrl: './manage-workouts.component.html',
  styleUrl: './manage-workouts.component.css',
})
export class ManageWorkoutsComponent implements OnInit {
  workouts = signal<Workout[]>([]);
  filteredWorkouts = signal<Workout[]>([]);
  loading = signal(true);
  searchQuery = '';

  // Edit state
  editingWorkout = signal<Workout | null>(null);
  editForm = {
    exercise_name: '',
    category: 'cardio' as 'cardio' | 'strength' | 'flexibility',
    duration_min: 0,
    calories_burned: 0,
    intensity: '',
    sets: 0,
    reps: 0,
    weight_kg: 0,
    notes: '',
  };
  saving = signal(false);

  // Delete state
  workoutToDelete = signal<Workout | null>(null);
  deleting = signal(false);

  constructor(
    private supabase: SupabaseService,
    private toast: ToastService,
    public i18n: I18nService,
  ) {}

  ngOnInit() {
    this.loadWorkouts();
  }

  async loadWorkouts() {
    this.loading.set(true);
    try {
      const workouts = await this.supabase.getAllWorkouts();
      this.workouts.set(workouts);
      this.applyFilter();
    } catch (err) {
      console.error('Failed to load workouts', err);
    } finally {
      this.loading.set(false);
    }
  }

  applyFilter() {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) {
      this.filteredWorkouts.set(this.workouts());
    } else {
      this.filteredWorkouts.set(
        this.workouts().filter(w =>
          w.exercise_name.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q)
        )
      );
    }
  }

  // ─── Date helpers ────────────────────────────────
  formatDate(utcStr?: string): string {
    if (!utcStr) return '';
    let iso = utcStr;
    if (!iso.endsWith('Z') && !/[+-]\d{2}:\d{2}$/.test(iso)) iso += 'Z';
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      timeZone: 'Asia/Bangkok',
    });
  }

  formatTime(utcStr?: string): string {
    if (!utcStr) return '';
    let iso = utcStr;
    if (!iso.endsWith('Z') && !/[+-]\d{2}:\d{2}$/.test(iso)) iso += 'Z';
    return new Date(iso).toLocaleTimeString('en-GB', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Bangkok',
    });
  }

  getCategoryIcon(cat: string): string {
    switch (cat) {
      case 'cardio': return 'favorite';
      case 'strength': return 'fitness_center';
      case 'flexibility': return 'self_improvement';
      default: return 'sports';
    }
  }

  getCategoryKey(cat: string): string {
    switch (cat) {
      case 'cardio': return 'workout.cardio';
      case 'strength': return 'workout.strength';
      case 'flexibility': return 'workout.flexibility';
      default: return cat;
    }
  }

  // ─── Edit ────────────────────────────────────────
  startEdit(workout: Workout) {
    this.editingWorkout.set(workout);
    this.editForm = {
      exercise_name: workout.exercise_name,
      category: workout.category,
      duration_min: workout.duration_min ?? 0,
      calories_burned: workout.calories_burned,
      intensity: workout.intensity ?? '',
      sets: workout.sets ?? 0,
      reps: workout.reps ?? 0,
      weight_kg: workout.weight_kg ?? 0,
      notes: workout.notes ?? '',
    };
  }

  cancelEdit() {
    this.editingWorkout.set(null);
  }

  async saveEdit() {
    const workout = this.editingWorkout();
    if (!workout?.id || !this.editForm.exercise_name.trim()) return;

    this.saving.set(true);
    try {
      const updates: Partial<Omit<Workout, 'id' | 'user_id' | 'created_at'>> = {
        exercise_name: this.editForm.exercise_name.trim(),
        calories_burned: this.editForm.calories_burned,
        notes: this.editForm.notes || undefined,
      };

      if (workout.category === 'cardio') {
        updates.duration_min = this.editForm.duration_min;
        updates.intensity = this.editForm.intensity || undefined;
      } else if (workout.category === 'strength') {
        updates.sets = this.editForm.sets;
        updates.reps = this.editForm.reps;
        updates.weight_kg = this.editForm.weight_kg;
      } else {
        updates.duration_min = this.editForm.duration_min;
      }

      const updated = await this.supabase.updateWorkout(workout.id, updates);
      this.workouts.update(list => list.map(w => w.id === workout.id ? updated : w));
      this.applyFilter();
      this.editingWorkout.set(null);
      this.toast.success(this.i18n.t('mw.workoutUpdated'));
    } catch (err) {
      console.error('Failed to update workout', err);
      this.toast.error(this.i18n.t('mw.failedUpdate'));
    } finally {
      this.saving.set(false);
    }
  }

  // ─── Delete ──────────────────────────────────────
  confirmDelete(workout: Workout) {
    this.workoutToDelete.set(workout);
  }

  cancelDelete() {
    this.workoutToDelete.set(null);
  }

  async deleteWorkout() {
    const workout = this.workoutToDelete();
    if (!workout?.id) return;

    this.deleting.set(true);
    try {
      await this.supabase.deleteWorkout(workout.id);
      this.workouts.update(list => list.filter(w => w.id !== workout.id));
      this.applyFilter();
      this.workoutToDelete.set(null);
      this.toast.success(this.i18n.t('mw.workoutDeleted'));
    } catch (err) {
      console.error('Failed to delete workout', err);
      this.toast.error(this.i18n.t('mw.failedDeleteErr'));
    } finally {
      this.deleting.set(false);
    }
  }
}
