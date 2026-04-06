import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzStatisticModule],
  template: `
    <nz-card class="summary-card">
      <div class="card-inner">
        <div class="card-body">
          <p class="card-label">{{ title }}</p>
          <nz-statistic
            [nzValue]="value"
            [nzPrefix]="'$'"
            [nzValueStyle]="{ color: color, fontSize: '26px', fontWeight: '700', letterSpacing: '-0.01em' }">
          </nz-statistic>
          <p *ngIf="subtitle" class="card-subtitle">{{ subtitle }}</p>
        </div>
        <div [class]="'card-icon-wrap ' + bgColor">
          <i class="material-icons" [style.color]="color" [style.fontSize]="'26px'">{{ icon }}</i>
        </div>
      </div>
    </nz-card>
  `,
  styles: [`
    .summary-card {
      border-radius: 14px !important;
      border: 1px solid var(--fg-border) !important;
      background: var(--fg-surface) !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease !important;
      cursor: default;
    }

    .summary-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--fg-shadow-lg) !important;
    }

    :host-context(.dark) .summary-card {
      border-color: #334155 !important;
      background: #1e293b !important;
    }

    .card-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .card-body {
      flex: 1;
      min-width: 0;
    }

    .card-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--fg-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin: 0 0 6px;
    }

    .card-subtitle {
      font-size: 12px;
      color: var(--fg-text-muted);
      margin: 4px 0 0;
    }

    :host-context(.dark) .card-label   { color: #64748b !important; }
    :host-context(.dark) .card-subtitle { color: #94a3b8 !important; }

    .card-icon-wrap {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    .summary-card:hover .card-icon-wrap {
      transform: scale(1.08) rotate(3deg);
    }
  `]
})
export class SummaryCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() icon: string = 'account_balance_wallet';
  @Input() color: string = '#059669';
  @Input() bgColor: string = 'card-icon-bg card-icon-emerald';
  @Input() subtitle?: string;
}
