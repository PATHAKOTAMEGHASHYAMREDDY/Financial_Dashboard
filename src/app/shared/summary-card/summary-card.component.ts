import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzStatisticModule],
  template: `
    <nz-card class="summary-card hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">{{ title }}</p>
          <nz-statistic 
            [nzValue]="value" 
            [nzPrefix]="prefix"
            [nzValueStyle]="{ color: color, fontSize: '24px', fontWeight: '600' }">
          </nz-statistic>
          <p *ngIf="subtitle" class="text-xs text-gray-400 mt-1">{{ subtitle }}</p>
        </div>
        <div [class]="'w-12 h-12 rounded-full flex items-center justify-center ' + bgColor">
          <i class="material-icons" [style.color]="color" style="font-size: 28px;">{{ icon }}</i>
        </div>
      </div>
    </nz-card>
  `,
  styles: [`
    .summary-card {
      border-radius: 12px;
      border: 1px solid #f0f0f0;
    }
    
    :host-context(.dark) .summary-card {
      border-color: #303030;
    }
  `]
})
export class SummaryCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() prefix: string = '$';
  @Input() icon: string = 'account_balance_wallet';
  @Input() color: string = '#3f8600';
  @Input() bgColor: string = 'bg-green-100';
  @Input() subtitle?: string;
}
