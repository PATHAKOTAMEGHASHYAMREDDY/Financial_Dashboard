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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SummaryCardComponent,
    NzCardModule,
    NzGridModule,
    BaseChartDirective
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
            label: (ctx) => ` $${ctx.parsed.y != null ? ctx.parsed.y.toLocaleString() : ''}`,
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
            callback: (v) => `$${Number(v).toLocaleString()}`
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
            label: (ctx) => ` $${Number(ctx.parsed).toLocaleString()}`,
          }
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

    // ── Line Chart: Green gradient ──
    this.lineChartData = {
      datasets: [{
        data: balanceTrend.map(t => t.balance),
        label: 'Balance',
        borderColor: '#059669',
        backgroundColor: this.isDarkMode
          ? 'rgba(5, 150, 105, 0.08)'
          : 'rgba(5, 150, 105, 0.07)',
        pointBackgroundColor: '#059669',
        pointBorderColor: this.isDarkMode ? '#1e293b' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
      }],
      labels: balanceTrend.map(t => t.date)
    };

    // ── Doughnut Chart: Green-dominant professional palette ──
    this.pieChartData = {
      datasets: [{
        data: this.categoryExpenses.map(c => c.amount),
        backgroundColor: [
          '#059669', // Emerald 600
          '#10b981', // Emerald 500
          '#34d399', // Emerald 400
          '#f59e0b', // Amber (contrast)
          '#6366f1', // Indigo (contrast)
          '#ef4444', // Red
          '#8b5cf6', // Violet
          '#06b6d4', // Cyan
        ],
        borderColor: this.isDarkMode ? '#1e293b' : '#ffffff',
        borderWidth: 2,
        hoverOffset: 6,
      }],
      labels: this.categoryExpenses.map(c => c.category)
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
