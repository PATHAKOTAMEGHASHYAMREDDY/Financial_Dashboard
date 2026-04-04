import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Transaction, Summary, CategoryExpense, MonthlyComparison } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly STORAGE_KEY = 'finance_transactions';
  private readonly VERSION_KEY = 'finance_data_version';
  private readonly CURRENT_VERSION = '2.0'; // Updated version
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public transactions$ = this.transactionsSubject.asObservable();

  constructor() {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    const storedVersion = localStorage.getItem(this.VERSION_KEY);
    const stored = localStorage.getItem(this.STORAGE_KEY);
    
    // If version doesn't match or no data, reinitialize
    if (storedVersion !== this.CURRENT_VERSION || !stored) {
      this.initializeMockData();
      localStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION);
    } else {
      const transactions = JSON.parse(stored).map((t: any) => ({
        ...t,
        date: new Date(t.date)
      }));
      this.transactionsSubject.next(transactions);
    }
  }

  private initializeMockData(): void {
    const mockTransactions: Transaction[] = [
      // April 2026 - Current Month
      { id: '1', date: new Date(2026, 3, 1), amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary payment' },
      { id: '2', date: new Date(2026, 3, 2), amount: 1200, category: 'Rent', type: 'expense', description: 'Monthly rent payment' },
      { id: '3', date: new Date(2026, 3, 3), amount: 300, category: 'Groceries', type: 'expense', description: 'Weekly groceries shopping' },
      { id: '4', date: new Date(2026, 3, 4), amount: 150, category: 'Entertainment', type: 'expense', description: 'Movie tickets and dinner' },
      { id: '5', date: new Date(2026, 3, 5), amount: 200, category: 'Transport', type: 'expense', description: 'Fuel and car maintenance' },
      { id: '6', date: new Date(2026, 3, 6), amount: 500, category: 'Freelance', type: 'income', description: 'Web design project payment' },
      { id: '7', date: new Date(2026, 3, 8), amount: 80, category: 'Entertainment', type: 'expense', description: 'Streaming subscriptions' },
      { id: '8', date: new Date(2026, 3, 10), amount: 250, category: 'Groceries', type: 'expense', description: 'Supermarket shopping' },
      { id: '9', date: new Date(2026, 3, 12), amount: 120, category: 'Transport', type: 'expense', description: 'Public transport monthly pass' },
      { id: '10', date: new Date(2026, 3, 14), amount: 300, category: 'Freelance', type: 'income', description: 'Logo design project' },
      { id: '11', date: new Date(2026, 3, 15), amount: 450, category: 'Shopping', type: 'expense', description: 'Clothing and accessories' },
      { id: '12', date: new Date(2026, 3, 16), amount: 90, category: 'Utilities', type: 'expense', description: 'Electricity bill' },
      { id: '13', date: new Date(2026, 3, 17), amount: 60, category: 'Utilities', type: 'expense', description: 'Internet bill' },
      { id: '14', date: new Date(2026, 3, 18), amount: 180, category: 'Healthcare', type: 'expense', description: 'Doctor consultation and medicines' },
      { id: '15', date: new Date(2026, 3, 20), amount: 200, category: 'Entertainment', type: 'expense', description: 'Concert tickets' },
      { id: '16', date: new Date(2026, 3, 22), amount: 350, category: 'Groceries', type: 'expense', description: 'Monthly grocery stock' },
      { id: '17', date: new Date(2026, 3, 24), amount: 100, category: 'Transport', type: 'expense', description: 'Taxi and ride-sharing' },
      { id: '18', date: new Date(2026, 3, 25), amount: 800, category: 'Freelance', type: 'income', description: 'Mobile app development' },
      { id: '19', date: new Date(2026, 3, 26), amount: 150, category: 'Dining', type: 'expense', description: 'Restaurant meals' },
      { id: '20', date: new Date(2026, 3, 28), amount: 75, category: 'Entertainment', type: 'expense', description: 'Gaming subscription' },
      { id: '21', date: new Date(2026, 3, 7), amount: 220, category: 'Shopping', type: 'expense', description: 'Books and stationery' },
      { id: '22', date: new Date(2026, 3, 9), amount: 45, category: 'Utilities', type: 'expense', description: 'Mobile phone bill' },
      { id: '23', date: new Date(2026, 3, 11), amount: 1500, category: 'Freelance', type: 'income', description: 'E-commerce website project' },
      { id: '24', date: new Date(2026, 3, 13), amount: 95, category: 'Healthcare', type: 'expense', description: 'Dental checkup' },
      { id: '25', date: new Date(2026, 3, 19), amount: 180, category: 'Dining', type: 'expense', description: 'Family dinner celebration' },
      { id: '26', date: new Date(2026, 3, 21), amount: 65, category: 'Transport', type: 'expense', description: 'Car wash and detailing' },
      { id: '27', date: new Date(2026, 3, 23), amount: 320, category: 'Shopping', type: 'expense', description: 'Electronics accessories' },
      { id: '28', date: new Date(2026, 3, 27), amount: 140, category: 'Entertainment', type: 'expense', description: 'Theme park tickets' },
      { id: '29', date: new Date(2026, 3, 29), amount: 280, category: 'Groceries', type: 'expense', description: 'Organic food shopping' },
      { id: '30', date: new Date(2026, 3, 30), amount: 400, category: 'Freelance', type: 'income', description: 'Social media marketing campaign' },
      
      // March 2026 - Previous Month
      { id: '31', date: new Date(2026, 2, 1), amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary payment' },
      { id: '32', date: new Date(2026, 2, 2), amount: 1200, category: 'Rent', type: 'expense', description: 'Monthly rent payment' },
      { id: '33', date: new Date(2026, 2, 5), amount: 400, category: 'Groceries', type: 'expense', description: 'Weekly groceries' },
      { id: '34', date: new Date(2026, 2, 8), amount: 250, category: 'Transport', type: 'expense', description: 'Car service and fuel' },
      { id: '35', date: new Date(2026, 2, 10), amount: 600, category: 'Freelance', type: 'income', description: 'Consulting project' },
      { id: '36', date: new Date(2026, 2, 12), amount: 100, category: 'Entertainment', type: 'expense', description: 'Movie and snacks' },
      { id: '37', date: new Date(2026, 2, 15), amount: 300, category: 'Shopping', type: 'expense', description: 'Electronics purchase' },
      { id: '38', date: new Date(2026, 2, 18), amount: 85, category: 'Utilities', type: 'expense', description: 'Water bill' },
      { id: '39', date: new Date(2026, 2, 20), amount: 200, category: 'Groceries', type: 'expense', description: 'Grocery shopping' },
      { id: '40', date: new Date(2026, 2, 22), amount: 150, category: 'Healthcare', type: 'expense', description: 'Pharmacy and checkup' },
      { id: '41', date: new Date(2026, 2, 25), amount: 400, category: 'Freelance', type: 'income', description: 'Graphic design work' },
      { id: '42', date: new Date(2026, 2, 28), amount: 120, category: 'Dining', type: 'expense', description: 'Weekend dining out' },
      { id: '43', date: new Date(2026, 2, 6), amount: 175, category: 'Shopping', type: 'expense', description: 'Home decor items' },
      { id: '44', date: new Date(2026, 2, 9), amount: 55, category: 'Utilities', type: 'expense', description: 'Gas bill' },
      { id: '45', date: new Date(2026, 2, 11), amount: 900, category: 'Freelance', type: 'income', description: 'UI/UX design project' },
      { id: '46', date: new Date(2026, 2, 14), amount: 130, category: 'Entertainment', type: 'expense', description: 'Sports event tickets' },
      { id: '47', date: new Date(2026, 2, 17), amount: 240, category: 'Groceries', type: 'expense', description: 'Bulk shopping' },
      { id: '48', date: new Date(2026, 2, 19), amount: 90, category: 'Transport', type: 'expense', description: 'Parking fees' },
      { id: '49', date: new Date(2026, 2, 23), amount: 160, category: 'Dining', type: 'expense', description: 'Lunch meetings' },
      { id: '50', date: new Date(2026, 2, 26), amount: 210, category: 'Healthcare', type: 'expense', description: 'Eye examination and glasses' },
      
      // February 2026
      { id: '51', date: new Date(2026, 1, 1), amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary payment' },
      { id: '52', date: new Date(2026, 1, 2), amount: 1200, category: 'Rent', type: 'expense', description: 'Monthly rent payment' },
      { id: '53', date: new Date(2026, 1, 5), amount: 350, category: 'Groceries', type: 'expense', description: 'Grocery shopping' },
      { id: '54', date: new Date(2026, 1, 10), amount: 180, category: 'Transport', type: 'expense', description: 'Fuel and parking' },
      { id: '55', date: new Date(2026, 1, 14), amount: 700, category: 'Freelance', type: 'income', description: 'Website development' },
      { id: '56', date: new Date(2026, 1, 18), amount: 95, category: 'Utilities', type: 'expense', description: 'Electricity bill' },
      { id: '57', date: new Date(2026, 1, 22), amount: 280, category: 'Shopping', type: 'expense', description: 'Home supplies' },
      { id: '58', date: new Date(2026, 1, 25), amount: 130, category: 'Entertainment', type: 'expense', description: 'Theater show tickets' },
      { id: '59', date: new Date(2026, 1, 8), amount: 190, category: 'Dining', type: 'expense', description: 'Valentine dinner' },
      { id: '60', date: new Date(2026, 1, 12), amount: 550, category: 'Freelance', type: 'income', description: 'Content writing project' },
      { id: '61', date: new Date(2026, 1, 16), amount: 75, category: 'Healthcare', type: 'expense', description: 'Vitamins and supplements' },
      { id: '62', date: new Date(2026, 1, 20), amount: 260, category: 'Groceries', type: 'expense', description: 'Weekly shopping' },
      { id: '63', date: new Date(2026, 1, 24), amount: 110, category: 'Transport', type: 'expense', description: 'Uber rides' },
      { id: '64', date: new Date(2026, 1, 27), amount: 340, category: 'Shopping', type: 'expense', description: 'Shoes and bags' },
      
      // January 2026
      { id: '65', date: new Date(2026, 0, 1), amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary payment' },
      { id: '66', date: new Date(2026, 0, 2), amount: 1200, category: 'Rent', type: 'expense', description: 'Monthly rent payment' },
      { id: '67', date: new Date(2026, 0, 5), amount: 420, category: 'Groceries', type: 'expense', description: 'New year grocery shopping' },
      { id: '68', date: new Date(2026, 0, 8), amount: 200, category: 'Entertainment', type: 'expense', description: 'New year celebration' },
      { id: '69', date: new Date(2026, 0, 12), amount: 850, category: 'Freelance', type: 'income', description: 'Brand identity design' },
      { id: '70', date: new Date(2026, 0, 15), amount: 150, category: 'Transport', type: 'expense', description: 'Car maintenance' },
      { id: '71', date: new Date(2026, 0, 18), amount: 88, category: 'Utilities', type: 'expense', description: 'Internet and phone' },
      { id: '72', date: new Date(2026, 0, 22), amount: 310, category: 'Shopping', type: 'expense', description: 'Winter clothing' },
      { id: '73', date: new Date(2026, 0, 25), amount: 125, category: 'Dining', type: 'expense', description: 'Weekend brunch' },
      { id: '74', date: new Date(2026, 0, 28), amount: 450, category: 'Freelance', type: 'income', description: 'SEO optimization project' },
      { id: '75', date: new Date(2026, 0, 30), amount: 195, category: 'Healthcare', type: 'expense', description: 'Annual health checkup' },
    ];
    this.transactionsSubject.next(mockTransactions);
    this.saveTransactions(mockTransactions);
  }

  private saveTransactions(transactions: Transaction[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(transactions));
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactionsSubject.value).pipe(delay(300));
  }

  addTransaction(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    const transactions = [...this.transactionsSubject.value, newTransaction];
    this.transactionsSubject.next(transactions);
    this.saveTransactions(transactions);
    return of(newTransaction).pipe(delay(300));
  }

  updateTransaction(id: string, transaction: Partial<Transaction>): Observable<Transaction> {
    const transactions = this.transactionsSubject.value.map(t =>
      t.id === id ? { ...t, ...transaction } : t
    );
    this.transactionsSubject.next(transactions);
    this.saveTransactions(transactions);
    return of(transactions.find(t => t.id === id)!).pipe(delay(300));
  }

  deleteTransaction(id: string): Observable<void> {
    const transactions = this.transactionsSubject.value.filter(t => t.id !== id);
    this.transactionsSubject.next(transactions);
    this.saveTransactions(transactions);
    return of(void 0).pipe(delay(300));
  }

  getSummary(): Summary {
    const transactions = this.transactionsSubject.value;
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalBalance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
      savings: totalIncome - totalExpenses
    };
  }

  getCategoryExpenses(): CategoryExpense[] {
    const transactions = this.transactionsSubject.value.filter(t => t.type === 'expense');
    const categoryMap = new Map<string, number>();
    
    transactions.forEach(t => {
      categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
    });

    const total = Array.from(categoryMap.values()).reduce((sum, val) => sum + val, 0);
    
    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / total) * 100
    })).sort((a, b) => b.amount - a.amount);
  }

  getMonthlyComparison(): MonthlyComparison {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const transactions = this.transactionsSubject.value;
    
    const currentMonthExpenses = transactions
      .filter(t => {
        const d = new Date(t.date);
        return t.type === 'expense' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);
    
    const lastMonthExpenses = transactions
      .filter(t => {
        const d = new Date(t.date);
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        return t.type === 'expense' && d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);
    
    const difference = currentMonthExpenses - lastMonthExpenses;
    const percentageChange = lastMonthExpenses > 0 ? (difference / lastMonthExpenses) * 100 : 0;
    
    return {
      currentMonth: currentMonthExpenses,
      lastMonth: lastMonthExpenses,
      difference,
      percentageChange
    };
  }

  getBalanceTrend(): { date: string; balance: number }[] {
    const transactions = [...this.transactionsSubject.value].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    let runningBalance = 0;
    const trend: { date: string; balance: number }[] = [];
    
    transactions.forEach(t => {
      runningBalance += t.type === 'income' ? t.amount : -t.amount;
      trend.push({
        date: new Date(t.date).toLocaleDateString(),
        balance: runningBalance
      });
    });
    
    return trend;
  }
}
