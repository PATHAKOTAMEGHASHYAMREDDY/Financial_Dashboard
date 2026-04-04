import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import { Summary, CategoryExpense, MonthlyComparison } from '../models/transaction.model';
import { SummaryCardComponent } from '../shared/summary-card/summary-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

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
export class DashboardComponent implements OnInit {
  summary: Summary = { totalBalance: 0, totalIncome: 0, totalExpenses: 0, savings: 0 };
  categoryExpenses: CategoryExpense[] = [];
  monthlyComparison: MonthlyComparison = { currentMonth: 0, lastMonth: 0, difference: 0, percentageChange: 0 };
  
  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Balance Trend' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  pieChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'right' },
      title: { display: true, text: 'Expenses by Category' }
    }
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.transactionService.transactions$.subscribe(() => {
      this.loadDashboardData();
    });
  }

  private loadDashboardData(): void {
    this.summary = this.transactionService.getSummary();
    this.categoryExpenses = this.transactionService.getCategoryExpenses();
    this.monthlyComparison = this.transactionService.getMonthlyComparison();
    this.loadChartData();
  }

  private loadChartData(): void {
    const balanceTrend = this.transactionService.getBalanceTrend();
    
    this.lineChartData = {
      datasets: [{
        data: balanceTrend.map(t => t.balance),
        label: 'Balance',
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4
      }],
      labels: balanceTrend.map(t => t.date)
    };

    this.pieChartData = {
      datasets: [{
        data: this.categoryExpenses.map(c => c.amount),
        backgroundColor: [
          '#0ea5e9',
          '#8b5cf6',
          '#ec4899',
          '#f59e0b',
          '#10b981',
          '#ef4444'
        ]
      }],
      labels: this.categoryExpenses.map(c => c.category)
    };
  }

  get highestSpendingCategory(): CategoryExpense | undefined {
    return this.categoryExpenses[0];
  }
}
