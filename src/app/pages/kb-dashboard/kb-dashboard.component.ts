import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupabaseService, ProgramDayLog } from '../../services/supabase.service';
import { I18nService } from '../../services/i18n.service';

const PROGRAM_ID = 'kettlebell-30day-v1';
const TOTAL_DAYS = 30;

interface PhaseInfo {
  id: number;
  titleKey: string;
  days: [number, number];
  color: string;
  icon: string;
}

const PHASES: PhaseInfo[] = [
  { id: 1, titleKey: 'kb.phase1Title', days: [1, 7], color: '#00b894', icon: 'bolt' },
  { id: 2, titleKey: 'kb.phase2Title', days: [8, 14], color: '#0984e3', icon: 'local_fire_department' },
  { id: 3, titleKey: 'kb.phase3Title', days: [15, 21], color: '#e17055', icon: 'whatshot' },
  { id: 4, titleKey: 'kb.phase4Title', days: [22, 30], color: '#d63031', icon: 'timer' },
];

@Component({
  selector: 'app-kb-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './kb-dashboard.component.html',
  styleUrl: './kb-dashboard.component.css',
})
export class KbDashboardComponent implements OnInit {
  loading = signal(true);
  completedDays = signal<Set<number>>(new Set());
  dayDates = signal<Map<number, string>>(new Map()); // day -> date string

  phases = PHASES;
  totalDays = TOTAL_DAYS;

  completedCount = computed(() => this.completedDays().size);
  progressPercent = computed(() => Math.round((this.completedCount() / this.totalDays) * 100));
  remainingDays = computed(() => this.totalDays - this.completedCount());

  currentStreak = computed(() => {
    const done = this.completedDays();
    let streak = 0;
    for (let d = this.totalDays; d >= 1; d--) {
      if (done.has(d)) streak++;
      else if (streak > 0) break;
    }
    return streak;
  });

  bestStreak = computed(() => {
    const done = this.completedDays();
    let best = 0;
    let curr = 0;
    for (let d = 1; d <= this.totalDays; d++) {
      if (done.has(d)) {
        curr++;
        if (curr > best) best = curr;
      } else {
        curr = 0;
      }
    }
    return best;
  });

  currentPhase = computed(() => {
    const done = this.completedDays();
    // Find which phase user is working on (last uncompleted or last completed)
    let lastCompleted = 0;
    for (let d = 1; d <= this.totalDays; d++) {
      if (done.has(d)) lastCompleted = d;
    }
    const nextDay = lastCompleted + 1;
    return this.phases.find(p => nextDay >= p.days[0] && nextDay <= p.days[1]) ??
           this.phases.find(p => lastCompleted >= p.days[0] && lastCompleted <= p.days[1]) ??
           this.phases[0];
  });

  phaseProgress = computed(() => {
    const done = this.completedDays();
    return this.phases.map(p => {
      const total = p.days[1] - p.days[0] + 1;
      let completed = 0;
      for (let d = p.days[0]; d <= p.days[1]; d++) {
        if (done.has(d)) completed++;
      }
      return { ...p, completed, total, percent: Math.round((completed / total) * 100) };
    });
  });

  // Calendar: 5 weeks (rows), 7 days (cols) mapped to day 1-30
  calendarWeeks = computed(() => {
    const weeks: (number | null)[][] = [];
    for (let w = 0; w < 5; w++) {
      const row: (number | null)[] = [];
      for (let d = 0; d < 7; d++) {
        const day = w * 7 + d + 1;
        row.push(day <= this.totalDays ? day : null);
      }
      weeks.push(row);
    }
    return weeks;
  });

  // Recent activity: last 5 completed days
  recentActivity = computed(() => {
    const done = this.completedDays();
    const dates = this.dayDates();
    const items: { day: number; date: string; phase: PhaseInfo }[] = [];
    for (let d = this.totalDays; d >= 1; d--) {
      if (done.has(d)) {
        const phase = this.phases.find(p => d >= p.days[0] && d <= p.days[1])!;
        items.push({ day: d, date: dates.get(d) ?? '', phase });
        if (items.length >= 5) break;
      }
    }
    return items;
  });

  constructor(
    private router: Router,
    private supabase: SupabaseService,
    public i18n: I18nService,
  ) {}

  ngOnInit() {
    this.loadProgress();
  }

  async loadProgress() {
    this.loading.set(true);
    try {
      const logs = await this.supabase.getProgramDayLogs(PROGRAM_ID);
      const set = new Set<number>();
      const dates = new Map<number, string>();
      for (const log of logs) {
        if (log.completed) {
          set.add(log.day);
          dates.set(log.day, log.date);
        }
      }
      this.completedDays.set(set);
      this.dayDates.set(dates);
    } catch {
      // keep empty
    } finally {
      this.loading.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  goToProgram() {
    this.router.navigate(['/workout-program']);
  }

  getPhaseForDay(day: number): PhaseInfo {
    return this.phases.find(p => day >= p.days[0] && day <= p.days[1]) ?? this.phases[0];
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString(this.i18n.lang() === 'th' ? 'th-TH' : 'en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
}
