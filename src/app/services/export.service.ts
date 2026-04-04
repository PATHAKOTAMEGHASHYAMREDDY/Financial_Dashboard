import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportToCSV(transactions: Transaction[], filename: string = 'transactions.csv'): void {
    const headers = ['ID', 'Date', 'Amount', 'Category', 'Type', 'Description'];
    const rows = transactions.map(t => [
      t.id,
      new Date(t.date).toLocaleDateString(),
      t.amount.toString(),
      t.category,
      t.type,
      t.description
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    this.downloadFile(csvContent, filename, 'text/csv');
  }

  exportToJSON(transactions: Transaction[], filename: string = 'transactions.json'): void {
    const jsonContent = JSON.stringify(transactions, null, 2);
    this.downloadFile(jsonContent, filename, 'application/json');
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
