import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupabaseService, WaterIntake, WaterLog } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';
import { I18nService } from '../../services/i18n.service';

interface WeekDay {
  date: Date;
  day: number;
  label: string;
  isToday: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'app-water-intake',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './water-intake.component.html',
  styleUrl: './water-intake.component.css',
})
export class WaterIntakeComponent implements OnInit {
  loading = signal(true);
  selectedDate = signal(new Date());
  currentAmount = signal(0);
  targetAmount = signal(2000);
  weekDays = signal<WeekDay[]>([]);
  logs = signal<WaterLog[]>([]);
  deletingLogId = signal<number | null>(null);
  addAmountValue = 250;
  showTargetDialog = signal(false);
  newTarget = 2000;

  readonly dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  percent = computed(() => {
    const target = this.targetAmount();
    if (target <= 0) return 0;
    return Math.min(100, Math.round((this.currentAmount() / target) * 100));
  });

  monthLabel = computed(() => {
    const d = this.selectedDate();
    return d.toLocaleString('default', { month: 'long' });
  });

  constructor(
    private router: Router,
    private supabase: SupabaseService,
    private toast: ToastService,
    public i18n: I18nService,
  ) {}

  ngOnInit() {
    this.buildWeek();
    this.loadData();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  private formatDate(d: Date): string {
    return d.toISOString().slice(0, 10);
  }

  buildWeek() {
    const selected = this.selectedDate();
    const dayOfWeek = selected.getDay();
    const startOfWeek = new Date(selected);
    startOfWeek.setDate(selected.getDate() - dayOfWeek);

    const today = new Date();
    const todayStr = this.formatDate(today);
    const selectedStr = this.formatDate(selected);

    const days: WeekDay[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const dateStr = this.formatDate(d);
      days.push({
        date: d,
        day: d.getDate(),
        label: this.dayLabels[d.getDay()],
        isToday: dateStr === todayStr,
        isSelected: dateStr === selectedStr,
      });
    }
    this.weekDays.set(days);
  }

  selectDay(day: WeekDay) {
    this.selectedDate.set(day.date);
    this.buildWeek();
    this.loadData();
  }

  prevWeek() {
    const d = new Date(this.selectedDate());
    d.setDate(d.getDate() - 7);
    this.selectedDate.set(d);
    this.buildWeek();
    this.loadData();
  }

  nextWeek() {
    const d = new Date(this.selectedDate());
    d.setDate(d.getDate() + 7);
    this.selectedDate.set(d);
    this.buildWeek();
    this.loadData();
  }

  async loadData() {
    this.loading.set(true);
    try {
      const dateStr = this.formatDate(this.selectedDate());
      const [record, waterLogs] = await Promise.all([
        this.supabase.getWaterIntakeForDate(dateStr),
        this.supabase.getWaterLogsForDate(dateStr),
      ]);
      if (record) {
        this.currentAmount.set(record.amount_ml);
        this.targetAmount.set(record.target_ml);
        this.newTarget = record.target_ml;
      } else {
        this.currentAmount.set(0);
        // Use the latest target from previous days
        const lastTarget = await this.supabase.getLatestWaterTarget();
        if (lastTarget) {
          this.targetAmount.set(lastTarget);
          this.newTarget = lastTarget;
        }
      }
      this.logs.set(waterLogs);
    } catch {
      // keep defaults
    } finally {
      this.loading.set(false);
    }
  }

  async addWater(amount: number) {
    const newAmount = this.currentAmount() + amount;
    this.currentAmount.set(newAmount);
    try {
      const dateStr = this.formatDate(this.selectedDate());
      const [, log] = await Promise.all([
        this.supabase.upsertWaterIntake(newAmount, this.targetAmount(), dateStr),
        this.supabase.addWaterLog(amount, dateStr),
      ]);
      this.logs.update(prev => [log, ...prev]);
      this.toast.show(this.i18n.t('water.saved'), 'success');
    } catch {
      this.currentAmount.set(newAmount - amount);
      this.toast.show(this.i18n.t('water.error'), 'error');
    }
  }

  async deleteLog(log: WaterLog) {
    if (!log.id) return;
    this.deletingLogId.set(log.id);
    try {
      await this.supabase.deleteWaterLog(log.id);
      this.logs.update(prev => prev.filter(l => l.id !== log.id));
      const newAmount = Math.max(0, this.currentAmount() - log.amount_ml);
      this.currentAmount.set(newAmount);
      await this.supabase.upsertWaterIntake(
        newAmount,
        this.targetAmount(),
        this.formatDate(this.selectedDate()),
      );
      this.toast.show(this.i18n.t('water.logDeleted'), 'success');
    } catch {
      this.toast.show(this.i18n.t('water.error'), 'error');
    } finally {
      this.deletingLogId.set(null);
    }
  }

  formatTime(dateStr?: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  openTargetDialog() {
    this.newTarget = this.targetAmount();
    this.showTargetDialog.set(true);
  }

  closeTargetDialog() {
    this.showTargetDialog.set(false);
  }

  async saveTarget() {
    this.targetAmount.set(this.newTarget);
    this.showTargetDialog.set(false);
    try {
      await this.supabase.upsertWaterIntake(
        this.currentAmount(),
        this.newTarget,
        this.formatDate(this.selectedDate()),
      );
      this.toast.show(this.i18n.t('water.targetSaved'), 'success');
    } catch {
      this.toast.show(this.i18n.t('water.error'), 'error');
    }
  }
}
