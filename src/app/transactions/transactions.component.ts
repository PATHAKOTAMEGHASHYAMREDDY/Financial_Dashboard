import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { RoleService } from '../services/role.service';
import { ExportService } from '../services/export.service';
import { Transaction } from '../models/transaction.model';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzModalModule,
    NzFormModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzCardModule,
    NzToolTipModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  isAdmin = false;
  pageSize = 10;
  
  searchText = '';
  selectedCategory = '';
  selectedType = '';
  dateRange: Date[] = [];
  amountRange = { min: 0, max: 0 };
  
  categories = ['Salary', 'Freelance', 'Rent', 'Groceries', 'Entertainment', 'Transport', 'Shopping', 'Utilities', 'Healthcare', 'Dining'];
  types = ['income', 'expense'];
  
  isModalVisible = false;
  isEditMode = false;
  currentTransaction: Partial<Transaction> = {};

  // Sort functions
  sortByDate = (a: Transaction, b: Transaction) => new Date(a.date).getTime() - new Date(b.date).getTime();
  sortByCategory = (a: Transaction, b: Transaction) => a.category.localeCompare(b.category);
  sortByType = (a: Transaction, b: Transaction) => a.type.localeCompare(b.type);
  sortByAmount = (a: Transaction, b: Transaction) => a.amount - b.amount;

  constructor(
    private transactionService: TransactionService,
    private roleService: RoleService,
    private exportService: ExportService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.roleService.role$.subscribe(role => {
      this.isAdmin = role === 'admin';
    });
    
    this.transactionService.transactions$.subscribe(transactions => {
      this.transactions = transactions;
      this.applyFilters();
    });
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
  }

  applyFilters(): void {
    let filtered = [...this.transactions];
    
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(search) ||
        t.category.toLowerCase().includes(search)
      );
    }
    
    if (this.selectedCategory) {
      filtered = filtered.filter(t => t.category === this.selectedCategory);
    }
    
    if (this.selectedType) {
      filtered = filtered.filter(t => t.type === this.selectedType);
    }
    
    if (this.dateRange && this.dateRange.length === 2 && this.dateRange[0] && this.dateRange[1]) {
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date);
        const startDate = new Date(this.dateRange[0]);
        const endDate = new Date(this.dateRange[1]);
        
        // Set time to start of day for accurate comparison
        transactionDate.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }
    
    if (this.amountRange.min > 0 || this.amountRange.max > 0) {
      filtered = filtered.filter(t => {
        if (this.amountRange.max > 0) {
          return t.amount >= this.amountRange.min && t.amount <= this.amountRange.max;
        }
        return t.amount >= this.amountRange.min;
      });
    }
    
    this.filteredTransactions = filtered;
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedCategory = '';
    this.selectedType = '';
    this.dateRange = [];
    this.amountRange = { min: 0, max: 0 };
    this.applyFilters();
  }

  showAddModal(): void {
    this.isEditMode = false;
    this.currentTransaction = {
      date: new Date(),
      amount: 0,
      category: '',
      type: 'expense',
      description: ''
    };
    this.isModalVisible = true;
  }

  showEditModal(transaction: Transaction): void {
    this.isEditMode = true;
    this.currentTransaction = { ...transaction };
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.isEditMode && this.currentTransaction.id) {
      this.transactionService.updateTransaction(
        this.currentTransaction.id,
        this.currentTransaction
      ).subscribe(() => {
        this.message.success('Transaction updated successfully');
        this.isModalVisible = false;
      });
    } else {
      this.transactionService.addTransaction(
        this.currentTransaction as Omit<Transaction, 'id'>
      ).subscribe(() => {
        this.message.success('Transaction added successfully');
        this.isModalVisible = false;
      });
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  deleteTransaction(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this transaction?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => {
        this.transactionService.deleteTransaction(id).subscribe(() => {
          this.message.success('Transaction deleted successfully');
        });
      }
    });
  }

  exportCSV(): void {
    this.exportService.exportToCSV(this.filteredTransactions);
    this.message.success('Exported to CSV');
  }

  exportJSON(): void {
    this.exportService.exportToJSON(this.filteredTransactions);
    this.message.success('Exported to JSON');
  }

  isFormValid(): boolean {
    const t = this.currentTransaction;
    return !!(
      t.date &&
      t.amount && t.amount > 0 &&
      t.category &&
      t.type &&
      t.description && t.description.trim().length > 0
    );
  }
}
