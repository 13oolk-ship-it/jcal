import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupabaseService, ProgramDayLog } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';
import { I18nService } from '../../services/i18n.service';

// ─── Program Data Model ─────────────────────────────

interface Exercise {
  name: string;
  nameKey: string;
  reps: string;
  icon: string;
  tip: string;
  tipKey: string;
  imageUrl: string;
}

interface Phase {
  id: number;
  titleKey: string;
  subtitleKey: string;
  days: [number, number]; // from, to
  sets: number;
  rest: string;
  duration: string;
  style: 'reps' | 'hiit';
  hiitWork?: number;
  hiitRest?: number;
  rounds?: number;
  exercises: Exercise[];
  color: string;
  icon: string;
}

const PROGRAM_ID = 'kettlebell-30day-v1';

const EXERCISES_BASE: Exercise[] = [
  {
    name: 'Kettlebell Swing',
    nameKey: 'kb.swing',
    reps: '',
    icon: 'fitness_center',
    tip: 'Drive hips forward. Arms are just hooks. Squeeze glutes at the top.',
    tipKey: 'kb.swingTip',
    imageUrl: 'https://www.youtube.com/embed/pAWaNCsncZA?autoplay=1&rel=0',
  },
  {
    name: 'Goblet Squat',
    nameKey: 'kb.goblet',
    reps: '',
    icon: 'accessibility_new',
    tip: 'Hold KB at chest. Push knees out. Go deep, keep back straight.',
    tipKey: 'kb.gobletTip',
    imageUrl: 'https://www.youtube.com/embed/sIX71MwChNg?autoplay=1&rel=0',
  },
  {
    name: 'Clean & Press',
    nameKey: 'kb.cleanPress',
    reps: '',
    icon: 'keyboard_double_arrow_up',
    tip: 'Clean to rack position, then press overhead. Alternate sides.',
    tipKey: 'kb.cleanPressTip',
    imageUrl: 'https://www.youtube.com/embed/km3f8_rpDdg?autoplay=1&rel=0',
  },
  {
    name: 'Russian Twist',
    nameKey: 'kb.russianTwist',
    reps: '',
    icon: 'sync',
    tip: 'Sit with feet off ground. Twist side to side touching KB to floor.',
    tipKey: 'kb.russianTwistTip',
    imageUrl: 'https://www.youtube.com/embed/PkGPokybYaU?autoplay=1&rel=0',
  },
];

function makePhases(): Phase[] {
  return [
    {
      id: 1,
      titleKey: 'kb.phase1Title',
      subtitleKey: 'kb.phase1Sub',
      days: [1, 7],
      sets: 4,
      rest: '60s',
      duration: '~20 min',
      style: 'reps',
      exercises: EXERCISES_BASE.map((e, i) => ({
        ...e,
        reps: ['20 reps', '15 reps', '10 reps/side', '30 reps'][i],
      })),
      color: '#00b894',
      icon: 'bolt',
    },
    {
      id: 2,
      titleKey: 'kb.phase2Title',
      subtitleKey: 'kb.phase2Sub',
      days: [8, 14],
      sets: 5,
      rest: '45-60s',
      duration: '~25 min',
      style: 'reps',
      exercises: EXERCISES_BASE.map((e, i) => ({
        ...e,
        reps: ['25 reps', '15 reps', '12 reps/side', '40 reps'][i],
      })),
      color: '#0984e3',
      icon: 'local_fire_department',
    },
    {
      id: 3,
      titleKey: 'kb.phase3Title',
      subtitleKey: 'kb.phase3Sub',
      days: [15, 21],
      sets: 6,
      rest: '45s',
      duration: '~25-30 min',
      style: 'reps',
      exercises: EXERCISES_BASE.map((e, i) => ({
        ...e,
        reps: ['30 reps', '20 reps', '12 reps/side', '50 reps'][i],
      })),
      color: '#e17055',
      icon: 'whatshot',
    },
    {
      id: 4,
      titleKey: 'kb.phase4Title',
      subtitleKey: 'kb.phase4Sub',
      days: [22, 30],
      sets: 5,
      rest: '1 min between rounds',
      duration: '~30 min',
      style: 'hiit',
      hiitWork: 40,
      hiitRest: 20,
      rounds: 5,
      exercises: EXERCISES_BASE.map(e => ({
        ...e,
        reps: '40s work / 20s rest',
      })),
      color: '#d63031',
      icon: 'timer',
    },
  ];
}

@Component({
  selector: 'app-workout-program',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './workout-program.component.html',
  styleUrl: './workout-program.component.css',
})
export class WorkoutProgramComponent implements OnInit {
  loading = signal(true);
  phases = makePhases();
  completedDays = signal<Set<number>>(new Set());
  selectedDay = signal<number | null>(null);
  togglingDay = signal<number | null>(null);
  showVideoDay = signal<string | null>(null); // exerciseName for modal

  totalDays = 30;
  programId = PROGRAM_ID;

  completedCount = computed(() => this.completedDays().size);
  progressPercent = computed(() => Math.round((this.completedCount() / this.totalDays) * 100));

  currentStreak = computed(() => {
    const done = this.completedDays();
    let streak = 0;
    // Count from latest completed day backwards
    for (let d = this.totalDays; d >= 1; d--) {
      if (done.has(d)) streak++;
      else if (streak > 0) break;
    }
    return streak;
  });

  constructor(
    private router: Router,
    private supabase: SupabaseService,
    private toast: ToastService,
    private sanitizer: DomSanitizer,
    public i18n: I18nService,
  ) {}

  ngOnInit() {
    this.loadProgress();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  getPhaseForDay(day: number): Phase {
    return this.phases.find(p => day >= p.days[0] && day <= p.days[1]) ?? this.phases[0];
  }

  selectDay(day: number) {
    this.selectedDay.set(this.selectedDay() === day ? null : day);
  }

  isDayCompleted(day: number): boolean {
    return this.completedDays().has(day);
  }

  getPhaseColor(day: number): string {
    return this.getPhaseForDay(day).color;
  }

  async loadProgress() {
    this.loading.set(true);
    try {
      const logs = await this.supabase.getProgramDayLogs(this.programId);
      const set = new Set<number>();
      for (const log of logs) {
        if (log.completed) set.add(log.day);
      }
      this.completedDays.set(set);
    } catch {
      // keep empty
    } finally {
      this.loading.set(false);
    }
  }

  async toggleDay(day: number) {
    this.togglingDay.set(day);
    const wasCompleted = this.isDayCompleted(day);
    const newCompleted = !wasCompleted;

    // Optimistic update
    const updated = new Set(this.completedDays());
    if (newCompleted) updated.add(day);
    else updated.delete(day);
    this.completedDays.set(updated);

    try {
      await this.supabase.toggleProgramDay(this.programId, day, newCompleted);
      this.toast.show(
        newCompleted ? this.i18n.t('kb.dayCompleted') : this.i18n.t('kb.dayUncompleted'),
        'success'
      );
    } catch {
      // Revert
      const reverted = new Set(this.completedDays());
      if (wasCompleted) reverted.add(day);
      else reverted.delete(day);
      this.completedDays.set(reverted);
      this.toast.show(this.i18n.t('kb.error'), 'error');
    } finally {
      this.togglingDay.set(null);
    }
  }

  openVideo(exerciseName: string) {
    this.showVideoDay.set(exerciseName);
  }

  closeVideo() {
    this.showVideoDay.set(null);
  }

  getVideoExercise(): Exercise | null {
    const name = this.showVideoDay();
    if (!name) return null;
    return EXERCISES_BASE.find(e => e.name === name) ?? null;
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getDaysArray(phase: Phase): number[] {
    const arr: number[] = [];
    for (let d = phase.days[0]; d <= phase.days[1]; d++) arr.push(d);
    return arr;
  }
}
