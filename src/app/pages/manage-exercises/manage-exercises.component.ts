import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SupabaseService, Exercise } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-manage-exercises',
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
  templateUrl: './manage-exercises.component.html',
  styleUrl: './manage-exercises.component.css',
})
export class ManageExercisesComponent implements OnInit {
  exercises = signal<Exercise[]>([]);
  filteredExercises = signal<Exercise[]>([]);
  loading = signal(true);
  searchQuery = '';
  activeCategory = signal<'all' | 'cardio' | 'strength' | 'flexibility'>('all');

  // Add state
  showAddForm = signal(false);
  addForm = this.emptyForm();
  adding = signal(false);

  // Edit state
  editingExercise = signal<Exercise | null>(null);
  editForm = this.emptyForm();
  saving = signal(false);

  // Delete state
  exerciseToDelete = signal<Exercise | null>(null);
  deleting = signal(false);

  iconOptions = [
    'directions_run', 'directions_walk', 'directions_bike', 'pool',
    'sports', 'fitness_center', 'rowing', 'stairs', 'music_note',
    'self_improvement', 'accessibility_new', 'sports_gymnastics',
    'sports_martial_arts', 'sports_kabaddi', 'sports_tennis',
    'skateboarding', 'surfing', 'hiking', 'downhill_skiing',
  ];

  categoryOptions: { value: Exercise['category']; labelKey: string }[] = [
    { value: 'cardio', labelKey: 'workout.cardio' },
    { value: 'strength', labelKey: 'workout.strength' },
    { value: 'flexibility', labelKey: 'workout.flexibility' },
  ];

  constructor(
    private supabase: SupabaseService,
    private toast: ToastService,
    public i18n: I18nService,
  ) {}

  ngOnInit() {
    this.loadExercises();
  }

  private emptyForm() {
    return {
      name: '',
      icon: 'fitness_center',
      cal_per_min: 5,
      category: 'cardio' as Exercise['category'],
      muscle: '',
    };
  }

  async loadExercises() {
    this.loading.set(true);
    try {
      const data = await this.supabase.getExercises();
      this.exercises.set(data);
      this.applyFilter();
    } catch (err) {
      console.error('Failed to load exercises', err);
    } finally {
      this.loading.set(false);
    }
  }

  applyFilter() {
    let list = this.exercises();
    const cat = this.activeCategory();
    if (cat !== 'all') {
      list = list.filter(e => e.category === cat);
    }
    const q = this.searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter(e =>
        e.name.toLowerCase().includes(q) ||
        (e.muscle ?? '').toLowerCase().includes(q)
      );
    }
    this.filteredExercises.set(list);
  }

  selectCategory(cat: 'all' | 'cardio' | 'strength' | 'flexibility') {
    this.activeCategory.set(cat);
    this.applyFilter();
  }

  getCategoryKey(cat: string): string {
    switch (cat) {
      case 'cardio': return 'workout.cardio';
      case 'strength': return 'workout.strength';
      case 'flexibility': return 'workout.flexibility';
      default: return cat;
    }
  }

  // ─── Add ─────────────────────────────────────────
  openAdd() {
    this.addForm = this.emptyForm();
    this.showAddForm.set(true);
  }

  cancelAdd() {
    this.showAddForm.set(false);
  }

  async saveAdd() {
    if (!this.addForm.name.trim()) return;
    this.adding.set(true);
    try {
      const created = await this.supabase.addExercise({
        name: this.addForm.name.trim(),
        icon: this.addForm.icon,
        cal_per_min: this.addForm.cal_per_min,
        category: this.addForm.category,
        muscle: this.addForm.muscle.trim() || undefined,
      });
      this.exercises.update(list => [...list, created]);
      this.applyFilter();
      this.showAddForm.set(false);
      this.toast.success(this.i18n.t('me.exerciseAdded'));
    } catch (err) {
      console.error('Failed to add exercise', err);
      this.toast.error(this.i18n.t('me.failedAdd'));
    } finally {
      this.adding.set(false);
    }
  }

  // ─── Edit ────────────────────────────────────────
  startEdit(exercise: Exercise) {
    this.editingExercise.set(exercise);
    this.editForm = {
      name: exercise.name,
      icon: exercise.icon,
      cal_per_min: exercise.cal_per_min,
      category: exercise.category,
      muscle: exercise.muscle ?? '',
    };
  }

  cancelEdit() {
    this.editingExercise.set(null);
  }

  async saveEdit() {
    const exercise = this.editingExercise();
    if (!exercise?.id || !this.editForm.name.trim()) return;

    this.saving.set(true);
    try {
      const updated = await this.supabase.updateExercise(exercise.id, {
        name: this.editForm.name.trim(),
        icon: this.editForm.icon,
        cal_per_min: this.editForm.cal_per_min,
        category: this.editForm.category,
        muscle: this.editForm.muscle.trim() || undefined,
      });
      this.exercises.update(list => list.map(e => e.id === exercise.id ? updated : e));
      this.applyFilter();
      this.editingExercise.set(null);
      this.toast.success(this.i18n.t('me.exerciseUpdated'));
    } catch (err) {
      console.error('Failed to update exercise', err);
      this.toast.error(this.i18n.t('me.failedUpdate'));
    } finally {
      this.saving.set(false);
    }
  }

  // ─── Delete ──────────────────────────────────────
  confirmDelete(exercise: Exercise) {
    this.exerciseToDelete.set(exercise);
  }

  cancelDelete() {
    this.exerciseToDelete.set(null);
  }

  async deleteExercise() {
    const exercise = this.exerciseToDelete();
    if (!exercise?.id) return;

    this.deleting.set(true);
    try {
      await this.supabase.deleteExercise(exercise.id);
      this.exercises.update(list => list.filter(e => e.id !== exercise.id));
      this.applyFilter();
      this.exerciseToDelete.set(null);
      this.toast.success(this.i18n.t('me.exerciseDeleted'));
    } catch (err) {
      console.error('Failed to delete exercise', err);
      this.toast.error(this.i18n.t('me.failedDelete'));
    } finally {
      this.deleting.set(false);
    }
  }
}
