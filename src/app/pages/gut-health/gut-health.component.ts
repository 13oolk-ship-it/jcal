import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SupabaseService, GutHealthLog } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-gut-health',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './gut-health.component.html',
  styleUrl: './gut-health.component.css',
})
export class GutHealthComponent implements OnInit {
  loading = signal(true);
  saving = signal(false);
  step = signal<'ask' | 'type' | 'feeling' | 'notes'>('ask');
  todayLogs = signal<GutHealthLog[]>([]);
  history = signal<GutHealthLog[]>([]);
  deletingId = signal<string | null>(null);

  // Form state
  hasBowelMovement = signal<boolean | null>(null);
  stoolType = signal<number | null>(null);
  feeling = signal<'good' | 'normal' | 'bad' | null>(null);
  notes = signal('');

  // Computed
  today = new Date().toISOString().split('T')[0];

  weeklyDots = computed(() => {
    const dots: { date: string; day: string; count: number; bestFeeling: string }[] = [];
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLogs = this.history().filter(h => h.date === dateStr);
      const withMovement = dayLogs.filter(h => h.has_bowel_movement);
      let bestFeeling = 'none';
      if (dayLogs.length > 0) {
        if (withMovement.length > 0) {
          if (withMovement.some(l => l.feeling === 'good')) bestFeeling = 'good';
          else if (withMovement.some(l => l.feeling === 'normal')) bestFeeling = 'normal';
          else if (withMovement.some(l => l.feeling === 'bad')) bestFeeling = 'bad';
          else bestFeeling = 'normal';
        } else {
          bestFeeling = 'no';
        }
      }
      dots.push({ date: dateStr, day: dayNames[d.getDay()], count: withMovement.length, bestFeeling });
    }
    return dots;
  });

  goodDaysPct = computed(() => {
    const logs = this.history().filter(h => h.has_bowel_movement);
    if (logs.length === 0) return 0;
    const good = logs.filter(h => h.feeling === 'good').length;
    return Math.round((good / logs.length) * 100);
  });

  insight = computed(() => {
    const logs = this.history();
    if (logs.length < 2) return null;

    // Group by date to check days without any bowel movement
    const dates = [...new Set(logs.map(l => l.date))].sort().reverse();
    let noDays = 0;
    for (const date of dates) {
      const dayLogs = logs.filter(l => l.date === date);
      if (dayLogs.every(l => !l.has_bowel_movement)) noDays++;
      else break;
    }
    if (noDays >= 2) return 'fiber';

    // Check frequent loose stools in recent entries
    const recent = logs.filter(l => l.has_bowel_movement).slice(0, 10);
    const loose = recent.filter(l => l.stool_type === 5).length;
    if (loose >= 3) return 'loose';

    // Check streak of good entries
    const goodCount = recent.filter(l => l.feeling === 'good').length;
    if (goodCount >= 5) return 'great';

    return null;
  });

  stoolTypes = [
    { id: 1, emoji: '🟤', labelKey: 'gut.hard' },
    { id: 2, emoji: '🟫', labelKey: 'gut.firm' },
    { id: 3, emoji: '🟤', labelKey: 'gut.normal' },
    { id: 4, emoji: '🟫', labelKey: 'gut.soft' },
    { id: 5, emoji: '💧', labelKey: 'gut.loose' },
  ];

  feelings = [
    { id: 'good' as const, emoji: '🙂', labelKey: 'gut.good' },
    { id: 'normal' as const, emoji: '😐', labelKey: 'gut.feelNormal' },
    { id: 'bad' as const, emoji: '😣', labelKey: 'gut.uncomfortable' },
  ];

  constructor(
    private supabase: SupabaseService,
    private toast: ToastService,
    public i18n: I18nService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.loading.set(true);
    try {
      const [todayLogs, history] = await Promise.all([
        this.supabase.getGutHealthLogsForDate(this.today),
        this.supabase.getGutHealthHistory(30),
      ]);
      this.todayLogs.set(todayLogs);
      this.history.set(history);
    } catch (err) {
      console.error('Failed to load gut health data', err);
    } finally {
      this.loading.set(false);
    }
  }

  selectNo() {
    this.hasBowelMovement.set(false);
    this.stoolType.set(null);
    this.feeling.set(null);
    this.notes.set('');
    this.saveLog();
  }

  selectYes() {
    this.hasBowelMovement.set(true);
    this.step.set('type');
  }

  selectStoolType(type: number) {
    this.stoolType.set(type);
    this.step.set('feeling');
  }

  selectFeeling(f: 'good' | 'normal' | 'bad') {
    this.feeling.set(f);
    this.step.set('notes');
  }

  async saveLog() {
    this.saving.set(true);
    try {
      await this.supabase.addGutHealthLog({
        has_bowel_movement: this.hasBowelMovement()!,
        stool_type: this.stoolType() ?? undefined,
        feeling: this.feeling() ?? undefined,
        notes: this.notes() || undefined,
        date: this.today,
      });
      this.toast.success(this.i18n.t('gut.saved'));
      this.resetForm();
      // Reload data
      const [todayLogs, history] = await Promise.all([
        this.supabase.getGutHealthLogsForDate(this.today),
        this.supabase.getGutHealthHistory(30),
      ]);
      this.todayLogs.set(todayLogs);
      this.history.set(history);
    } catch (err) {
      console.error('Failed to save gut health log', err);
      this.toast.error(this.i18n.t('gut.error'));
    } finally {
      this.saving.set(false);
    }
  }

  async deleteLog(id: string) {
    this.deletingId.set(id);
    try {
      await this.supabase.deleteGutHealthLog(id);
      this.toast.success(this.i18n.t('gut.deleted'));
      const [todayLogs, history] = await Promise.all([
        this.supabase.getGutHealthLogsForDate(this.today),
        this.supabase.getGutHealthHistory(30),
      ]);
      this.todayLogs.set(todayLogs);
      this.history.set(history);
    } catch (err) {
      console.error('Failed to delete gut health log', err);
      this.toast.error(this.i18n.t('gut.error'));
    } finally {
      this.deletingId.set(null);
    }
  }

  resetForm() {
    this.hasBowelMovement.set(null);
    this.stoolType.set(null);
    this.feeling.set(null);
    this.notes.set('');
    this.step.set('ask');
  }

  getStoolEmoji(type?: number): string {
    return this.stoolTypes.find(s => s.id === type)?.emoji ?? '';
  }

  getStoolLabel(type?: number): string {
    const st = this.stoolTypes.find(s => s.id === type);
    return st ? this.i18n.t(st.labelKey) : '';
  }

  getFeelingEmoji(f?: string): string {
    return this.feelings.find(fl => fl.id === f)?.emoji ?? '';
  }

  getFeelingLabel(f?: string): string {
    const fl = this.feelings.find(fli => fli.id === f);
    return fl ? this.i18n.t(fl.labelKey) : '';
  }

  formatTime(utcStr?: string): string {
    if (!utcStr) return '';
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
}
