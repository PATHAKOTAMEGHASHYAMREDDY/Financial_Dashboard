import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly ROLE_KEY = 'finance_user_role';
  private roleSubject = new BehaviorSubject<UserRole>('admin');
  public role$ = this.roleSubject.asObservable();

  constructor() {
    this.loadRole();
  }

  private loadRole(): void {
    const stored = localStorage.getItem(this.ROLE_KEY) as UserRole;
    if (stored) {
      this.roleSubject.next(stored);
    }
  }

  setRole(role: UserRole): void {
    this.roleSubject.next(role);
    localStorage.setItem(this.ROLE_KEY, role);
  }

  getRole(): UserRole {
    return this.roleSubject.value;
  }

  isAdmin(): boolean {
    return this.roleSubject.value === 'admin';
  }
}
