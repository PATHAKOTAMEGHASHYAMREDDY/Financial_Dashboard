import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ThemeService } from './services/theme.service';
import { RoleService } from './services/role.service';
import { UserRole } from './models/transaction.model';
import { filter } from 'rxjs/operators';

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
  isMobileSidebarOpen = false;

  constructor(
    private themeService: ThemeService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
    
    this.roleService.role$.subscribe(role => {
      this.currentRole = role;
    });

    // Close mobile sidebar on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (window.innerWidth <= 768 && this.isMobileSidebarOpen) {
        this.closeMobileSidebar();
      }
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onRoleChange(role: UserRole): void {
    this.roleService.setRole(role);
  }

  onSidebarMouseEnter(): void {
    // Only apply hover behavior on desktop
    if (window.innerWidth > 768) {
      this.isCollapsed = false;
      this.sidebarWidth = 250;
    }
  }

  onSidebarMouseLeave(): void {
    // Only apply hover behavior on desktop
    if (window.innerWidth > 768) {
      this.isCollapsed = true;
      this.sidebarWidth = 80;
    }
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    
    // On mobile, force sidebar to be expanded when open
    if (window.innerWidth <= 768) {
      if (this.isMobileSidebarOpen) {
        this.isCollapsed = false;
      }
    }
    
    // Prevent body scroll when sidebar is open on mobile
    if (this.isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
    document.body.style.overflow = '';
  }

  onMenuItemClick(): void {
    // Close sidebar on mobile when menu item is clicked
    if (window.innerWidth <= 768) {
      this.closeMobileSidebar();
    }
  }
}
