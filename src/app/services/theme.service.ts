import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'finance_theme';
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  private loadTheme(): void {
    const stored = localStorage.getItem(this.THEME_KEY);
    const isDark = stored === 'dark';
    this.darkModeSubject.next(isDark);
    this.applyTheme(isDark);
  }

  toggleTheme(): void {
    const isDark = !this.darkModeSubject.value;
    this.darkModeSubject.next(isDark);
    this.applyTheme(isDark);
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
