import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ThemeService } from './services/theme.service';
import { RoleService } from './services/role.service';
import { UserRole } from './models/transaction.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzToolTipModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  isDarkMode = false;
  currentRole: UserRole = 'admin';
  sidebarWidth = 80;

  constructor(
    private themeService: ThemeService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
    
    this.roleService.role$.subscribe(role => {
      this.currentRole = role;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onRoleChange(role: UserRole): void {
    this.roleService.setRole(role);
  }

  onSidebarMouseEnter(): void {
    this.isCollapsed = false;
    this.sidebarWidth = 250;
  }

  onSidebarMouseLeave(): void {
    this.isCollapsed = true;
    this.sidebarWidth = 80;
  }
}
