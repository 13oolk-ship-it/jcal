import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupabaseService, Workout } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';

export interface ExercisePreset {
  name: string;
  icon: string;
  calPerMin: number; // base calories per minute (moderate intensity)
  category: 'cardio' | 'strength' | 'flexibility';
  muscle?: string;
}

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css',
})
export class AddWorkoutComponent implements OnInit {
  Math = Math; // expose to template

  activeCategory = signal<'cardio' | 'strength' | 'flexibility'>('cardio');
  selectedExercise = signal<ExercisePreset | null>(null);
  saving = signal(false);
  loading = signal(true);
  todayWorkouts = signal<Workout[]>([]);
  deletingId = signal<number | null>(null);

  // Cardio fields
  duration = signal(30);
  intensity = signal<'low' | 'moderate' | 'high' | 'intense'>('moderate');

  // Strength fields
  sets = signal(3);
  reps = signal(10);
  weightKg = signal(20);

  // Flexibility fields
  flexDuration = signal(15);

  // Shared
  notes = '';

  intensityOptions = [
    { value: 'low' as const, label: 'Light', icon: 'sentiment_satisfied', multiplier: 0.6, color: '#00b894' },
    { value: 'moderate' as const, label: 'Moderate', icon: 'sentiment_neutral', multiplier: 1.0, color: '#0984e3' },
    { value: 'high' as const, label: 'Hard', icon: 'sentiment_very_dissatisfied', multiplier: 1.4, color: '#e17055' },
    { value: 'intense' as const, label: 'Intense', icon: 'whatshot', multiplier: 1.8, color: '#d63031' },
  ];

  cardioExercises: ExercisePreset[] = [
    { name: 'Running', icon: 'directions_run', calPerMin: 11, category: 'cardio' },
    { name: 'Walking', icon: 'directions_walk', calPerMin: 4.5, category: 'cardio' },
    { name: 'Cycling', icon: 'directions_bike', calPerMin: 8.5, category: 'cardio' },
    { name: 'Swimming', icon: 'pool', calPerMin: 10, category: 'cardio' },
    { name: 'Jump Rope', icon: 'sports', calPerMin: 12, category: 'cardio' },
    { name: 'Elliptical', icon: 'fitness_center', calPerMin: 8, category: 'cardio' },
    { name: 'Rowing', icon: 'rowing', calPerMin: 9, category: 'cardio' },
    { name: 'Stair Climbing', icon: 'stairs', calPerMin: 10, category: 'cardio' },
    { name: 'Dancing', icon: 'music_note', calPerMin: 6.5, category: 'cardio' },
  ];

  strengthExercises: ExercisePreset[] = [
    { name: 'Bench Press', icon: 'fitness_center', calPerMin: 5, category: 'strength', muscle: 'Chest' },
    { name: 'Squats', icon: 'fitness_center', calPerMin: 6, category: 'strength', muscle: 'Legs' },
    { name: 'Deadlift', icon: 'fitness_center', calPerMin: 6.5, category: 'strength', muscle: 'Back' },
    { name: 'Shoulder Press', icon: 'fitness_center', calPerMin: 4.5, category: 'strength', muscle: 'Shoulders' },
    { name: 'Bicep Curl', icon: 'fitness_center', calPerMin: 3.5, category: 'strength', muscle: 'Arms' },
    { name: 'Lat Pulldown', icon: 'fitness_center', calPerMin: 4, category: 'strength', muscle: 'Back' },
    { name: 'Leg Press', icon: 'fitness_center', calPerMin: 5.5, category: 'strength', muscle: 'Legs' },
    { name: 'Tricep Dips', icon: 'fitness_center', calPerMin: 4, category: 'strength', muscle: 'Arms' },
    { name: 'Push-ups', icon: 'fitness_center', calPerMin: 5, category: 'strength', muscle: 'Chest' },
  ];

  flexibilityExercises: ExercisePreset[] = [
    { name: 'Yoga', icon: 'self_improvement', calPerMin: 3.5, category: 'flexibility' },
    { name: 'Stretching', icon: 'accessibility_new', calPerMin: 2.5, category: 'flexibility' },
    { name: 'Pilates', icon: 'self_improvement', calPerMin: 4, category: 'flexibility' },
    { name: 'Foam Rolling', icon: 'sports_gymnastics', calPerMin: 2, category: 'flexibility' },
  ];

  exercises = computed(() => {
    switch (this.activeCategory()) {
      case 'cardio': return this.cardioExercises;
      case 'strength': return this.strengthExercises;
      case 'flexibility': return this.flexibilityExercises;
    }
  });

  estimatedCalories = computed(() => {
    const ex = this.selectedExercise();
    if (!ex) return 0;
    if (ex.category === 'cardio') {
      const mult = this.intensityOptions.find(i => i.value === this.intensity())?.multiplier ?? 1;
      return Math.round(ex.calPerMin * this.duration() * mult);
    }
    if (ex.category === 'strength') {
      const workCals = this.sets() * this.reps() * this.weightKg() * 0.05;
      const timeMins = this.sets() * 1.5;
      return Math.round(workCals + ex.calPerMin * timeMins);
    }
    // Flexibility
    return Math.round(ex.calPerMin * this.flexDuration());
  });

  todayTotalBurned = computed(() =>
    this.todayWorkouts().reduce((sum, w) => sum + w.calories_burned, 0)
  );

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.loadTodayWorkouts();
  }

  async loadTodayWorkouts() {
    this.loading.set(true);
    try {
      const workouts = await this.supabase.getTodayWorkouts();
      this.todayWorkouts.set(workouts);
    } catch {
      // ignore
    } finally {
      this.loading.set(false);
    }
  }

  selectCategory(cat: 'cardio' | 'strength' | 'flexibility') {
    this.activeCategory.set(cat);
    this.selectedExercise.set(null);
  }

  selectExercise(ex: ExercisePreset) {
    this.selectedExercise.set(ex);
    // Reset defaults
    this.duration.set(30);
    this.intensity.set('moderate');
    this.sets.set(3);
    this.reps.set(10);
    this.weightKg.set(20);
    this.flexDuration.set(15);
    this.notes = '';
  }

  clearSelection() {
    this.selectedExercise.set(null);
  }

  async logWorkout() {
    const ex = this.selectedExercise();
    if (!ex) return;
    this.saving.set(true);
    try {
      const workout: Omit<Workout, 'id' | 'user_id' | 'created_at'> = {
        exercise_name: ex.name,
        category: ex.category,
        calories_burned: this.estimatedCalories(),
        notes: this.notes || undefined,
      };

      if (ex.category === 'cardio') {
        workout.duration_min = this.duration();
        workout.intensity = this.intensity();
      } else if (ex.category === 'strength') {
        workout.sets = this.sets();
        workout.reps = this.reps();
        workout.weight_kg = this.weightKg();
        workout.duration_min = Math.round(this.sets() * 1.5);
      } else {
        workout.duration_min = this.flexDuration();
      }

      const saved = await this.supabase.addWorkout(workout);
      this.todayWorkouts.update(list => [saved, ...list]);
      this.toast.success(`${ex.name} logged — ${this.estimatedCalories()} kcal burned 🔥`);
      this.selectedExercise.set(null);
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to log workout');
    } finally {
      this.saving.set(false);
    }
  }

  async deleteWorkout(workout: Workout) {
    if (!workout.id) return;
    this.deletingId.set(workout.id);
    try {
      await this.supabase.deleteWorkout(workout.id);
      this.todayWorkouts.update(list => list.filter(w => w.id !== workout.id));
      this.toast.success('Workout deleted');
    } catch {
      this.toast.error('Failed to delete');
    } finally {
      this.deletingId.set(null);
    }
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
}
