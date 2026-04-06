import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import { ThemeService } from '../services/theme.service';
import { Summary, CategoryExpense, MonthlyComparison } from '../models/transaction.model';
import { SummaryCardComponent } from '../shared/summary-card/summary-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Subscription } from 'rxjs';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SummaryCardComponent,
    NzCardModule,
    NzGridModule,
    BaseChartDirective,
    LottieComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  summary: Summary = { totalBalance: 0, totalIncome: 0, totalExpenses: 0, savings: 0 };
  categoryExpenses: CategoryExpense[] = [];
  monthlyComparison: MonthlyComparison = { currentMonth: 0, lastMonth: 0, difference: 0, percentageChange: 0 };
  isDarkMode = false;
  private subs = new Subscription();

  lottieOptions: AnimationOptions = {
    path: '/Isometric data analysis.json',
    loop: true,
    autoplay: true,
  };

  lineChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  get lineChartOptions(): ChartConfiguration['options'] {
    const textColor = this.isDarkMode ? '#94a3b8' : '#64748b';
    const gridColor = this.isDarkMode ? 'rgba(51,65,85,0.6)' : 'rgba(226,232,240,0.8)';
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: textColor,
            font: { family: 'Inter', size: 12, weight: 500 },
            boxWidth: 12,
            padding: 16,
          }
        },
        title: { display: false },
        tooltip: {
          backgroundColor: this.isDarkMode ? '#1e293b' : '#ffffff',
          titleColor: this.isDarkMode ? '#f1f5f9' : '#0f172a',
          bodyColor: this.isDarkMode ? '#94a3b8' : '#64748b',
          borderColor: this.isDarkMode ? '#334155' : '#e2e8f0',
          borderWidth: 1,
          cornerRadius: 10,
          padding: 12,
          callbacks: {
            label: (ctx) => ` ₹${ctx.parsed.y != null ? ctx.parsed.y.toLocaleString() : ''}`,
          }
        }
      },
      scales: {
        x: {
          ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
          grid: { color: gridColor, drawBorder: false } as any
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColor,
            font: { family: 'Inter', size: 11 },
            callback: (v) => `₹${Number(v).toLocaleString()}`
          },
          grid: { color: gridColor, drawBorder: false } as any
        }
      }
    };
  }

  pieChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  get pieChartOptions(): ChartConfiguration['options'] {
    const textColor = this.isDarkMode ? '#94a3b8' : '#64748b';
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: textColor,
            font: { family: 'Inter', size: 12, weight: 500 },
            boxWidth: 12,
            padding: 16,
          }
        },
        title: { display: false },
        tooltip: {
          backgroundColor: this.isDarkMode ? '#1e293b' : '#ffffff',
          titleColor: this.isDarkMode ? '#f1f5f9' : '#0f172a',
          bodyColor: this.isDarkMode ? '#94a3b8' : '#64748b',
          borderColor: this.isDarkMode ? '#334155' : '#e2e8f0',
          borderWidth: 1,
          cornerRadius: 10,
          padding: 12,
          callbacks: {
            label: (ctx) => ` ₹${Number(ctx.parsed).toLocaleString()}`,
          }
        }
      }
    };
  }

  barChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  radarChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  get barChartOptions(): ChartConfiguration['options'] {
    const textColor = this.isDarkMode ? '#94a3b8' : '#64748b';
    const gridColor = this.isDarkMode ? 'rgba(51,65,85,0.6)' : 'rgba(226,232,240,0.8)';
    return {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true, position: 'top',
          labels: { color: textColor, font: { family: 'Inter', size: 12, weight: 500 }, boxWidth: 12, padding: 16 }
        },
        tooltip: {
          backgroundColor: this.isDarkMode ? '#1e293b' : '#ffffff',
          titleColor: this.isDarkMode ? '#f1f5f9' : '#0f172a',
          bodyColor: this.isDarkMode ? '#94a3b8' : '#64748b',
          borderColor: this.isDarkMode ? '#334155' : '#e2e8f0',
          borderWidth: 1, cornerRadius: 10, padding: 12,
          callbacks: { label: (ctx) => ` ₹${(ctx.parsed?.y ?? 0).toLocaleString()}` }
        }
      },
      scales: {
        x: { ticks: { color: textColor, font: { family: 'Inter', size: 11 } }, grid: { color: gridColor, drawBorder: false } as any },
        y: {
          beginAtZero: true,
          ticks: { color: textColor, font: { family: 'Inter', size: 11 }, callback: (v) => `₹${Number(v).toLocaleString()}` },
          grid: { color: gridColor, drawBorder: false } as any
        }
      }
    };
  }

  get radarChartOptions(): ChartConfiguration['options'] {
    const textColor = this.isDarkMode ? '#94a3b8' : '#64748b';
    const gridColor = this.isDarkMode ? 'rgba(51,65,85,0.5)' : 'rgba(226,232,240,0.9)';
    return {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true, position: 'top',
          labels: { color: textColor, font: { family: 'Inter', size: 12, weight: 500 }, boxWidth: 12, padding: 16 }
        },
        tooltip: {
          backgroundColor: this.isDarkMode ? '#1e293b' : '#ffffff',
          titleColor: this.isDarkMode ? '#f1f5f9' : '#0f172a',
          bodyColor: this.isDarkMode ? '#94a3b8' : '#64748b',
          borderColor: this.isDarkMode ? '#334155' : '#e2e8f0',
          borderWidth: 1, cornerRadius: 10, padding: 12,
          callbacks: { label: (ctx) => ` ₹${Number((ctx.raw as number)).toLocaleString()}` }
        }
      },
      scales: {
        r: {
          angleLines: { color: gridColor },
          grid: { color: gridColor },
          pointLabels: { color: textColor, font: { family: 'Inter', size: 11 } },
          ticks: { color: textColor, backdropColor: 'transparent', callback: (v) => `₹${Number(v).toLocaleString()}` }
        }
      }
    };
  }

  constructor(
    private transactionService: TransactionService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.themeService.darkMode$.subscribe(isDark => {
        this.isDarkMode = isDark;
        this.loadChartData(); // re-render charts on theme change
      })
    );

    this.loadDashboardData();

    this.subs.add(
      this.transactionService.transactions$.subscribe(() => {
        this.loadDashboardData();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private loadDashboardData(): void {
    this.summary = this.transactionService.getSummary();
    this.categoryExpenses = this.transactionService.getCategoryExpenses();
    this.monthlyComparison = this.transactionService.getMonthlyComparison();
    this.loadChartData();
  }

  private loadChartData(): void {
    const balanceTrend = this.transactionService.getBalanceTrend();
    const transactions = this.transactionService['transactionsSubject'].value;

    // ── Line Chart: Balance Trend ──
    this.lineChartData = {
      datasets: [{
        data: balanceTrend.map(t => t.balance),
        label: 'Balance',
        borderColor: '#059669',
        backgroundColor: this.isDarkMode ? 'rgba(5, 150, 105, 0.08)' : 'rgba(5, 150, 105, 0.07)',
        pointBackgroundColor: '#059669',
        pointBorderColor: this.isDarkMode ? '#1e293b' : '#ffffff',
        pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
        fill: true, tension: 0.4, borderWidth: 2.5,
      }],
      labels: balanceTrend.map(t => t.date)
    };

    // ── Doughnut Chart ──
    this.pieChartData = {
      datasets: [{
        data: this.categoryExpenses.map(c => c.amount),
        backgroundColor: ['#059669','#10b981','#34d399','#f59e0b','#6366f1','#ef4444','#8b5cf6','#06b6d4'],
        borderColor: this.isDarkMode ? '#1e293b' : '#ffffff',
        borderWidth: 2, hoverOffset: 6,
      }],
      labels: this.categoryExpenses.map(c => c.category)
    };

    // ── Bar Chart: Monthly Income vs Expenses (last 4 months) ──
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const now = new Date();
    const last4: { label: string; income: number; expense: number }[] = [];
    for (let i = 3; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const m = d.getMonth(); const y = d.getFullYear();
      const inc = transactions.filter(t => {
        const td = new Date(t.date); return t.type === 'income' && td.getMonth() === m && td.getFullYear() === y;
      }).reduce((s, t) => s + t.amount, 0);
      const exp = transactions.filter(t => {
        const td = new Date(t.date); return t.type === 'expense' && td.getMonth() === m && td.getFullYear() === y;
      }).reduce((s, t) => s + t.amount, 0);
      last4.push({ label: `${months[m]} '${String(y).slice(-2)}`, income: inc, expense: exp });
    }
    this.barChartData = {
      labels: last4.map(m => m.label),
      datasets: [
        {
          label: 'Income',
          data: last4.map(m => m.income),
          backgroundColor: this.isDarkMode ? 'rgba(52,211,153,0.75)' : 'rgba(5,150,105,0.8)',
          borderColor: this.isDarkMode ? '#34d399' : '#059669',
          borderWidth: 1.5, borderRadius: 6, borderSkipped: false as any,
        },
        {
          label: 'Expenses',
          data: last4.map(m => m.expense),
          backgroundColor: this.isDarkMode ? 'rgba(248,113,113,0.7)' : 'rgba(220,38,38,0.75)',
          borderColor: this.isDarkMode ? '#f87171' : '#dc2626',
          borderWidth: 1.5, borderRadius: 6, borderSkipped: false as any,
        }
      ]
    };

    // ── Radar Chart: Spending by Category ──
    const top6 = this.categoryExpenses.slice(0, 6);
    this.radarChartData = {
      labels: top6.map(c => c.category),
      datasets: [{
        label: 'Spending (₹)',
        data: top6.map(c => c.amount),
        backgroundColor: this.isDarkMode ? 'rgba(52,211,153,0.15)' : 'rgba(5,150,105,0.12)',
        borderColor: this.isDarkMode ? '#34d399' : '#059669',
        pointBackgroundColor: this.isDarkMode ? '#34d399' : '#059669',
        pointBorderColor: this.isDarkMode ? '#1e293b' : '#ffffff',
        pointBorderWidth: 2, pointRadius: 4,
        borderWidth: 2,
      }]
    };
  }

  get highestSpendingCategory(): CategoryExpense | undefined {
    return this.categoryExpenses[0];
  }

  get savingsRate(): string {
    if (this.summary.totalIncome === 0) return '0.0';
    return ((this.summary.savings / this.summary.totalIncome) * 100).toFixed(1);
  }

  get isPositiveMonthChange(): boolean {
    return this.monthlyComparison.difference < 0;
  }
}
