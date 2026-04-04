export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
}

export interface Summary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savings: number;
}

export interface CategoryExpense {
  category: string;
  amount: number;
  percentage: number;
}

export interface MonthlyComparison {
  currentMonth: number;
  lastMonth: number;
  difference: number;
  percentageChange: number;
}

export type UserRole = 'admin' | 'viewer';
