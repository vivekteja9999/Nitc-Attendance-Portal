import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MENU_ITEMS } from './menu-items';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WebSocketService } from '../util/websocket.service';

@Component({
  selector: 'app-navbar-loggedin',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar_loggedin.component.html',
  styleUrl: './navbar_loggedin.component.css',
})
export class NavbarLoggedComponent implements OnInit {
  isSidenavOpen = false;
  isProfileOpen = false;
  menuItems: any[] = [];
  isNotificationsOpen = false;
  role = localStorage.getItem('role');
  unReadCount = 0;
  // ✅ Notifications
  notifications: string[] = []; // Unified list for user/admin
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private webSocketService: WebSocketService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const role = this.authService.getRole() as keyof typeof MENU_ITEMS;
    if (role !== null) {
      this.menuItems = MENU_ITEMS[role] || MENU_ITEMS.USER;
    }
    this.isAdmin = role === 'ADMIN';

    // ✅ Listen for Notifications
    if (this.isAdmin) {
      this.webSocketService.adminNotifications$.subscribe((messages) => {
        const newMessages = messages.filter(msg => !this.notifications.includes(msg));
      if (newMessages.length > 0) {
        this.notifications = [...newMessages, ...this.notifications];
        localStorage.setItem('admin_notifications', JSON.stringify(this.notifications));
        this.unReadCount+=messages.length // Save to localStorage
        this.cdRef.detectChanges();
      }
      });
    } else {
      this.webSocketService.userNotifications$.subscribe((message) => {
        if (message) {
          this.notifications = [message.message, ...this.notifications];
          this.unReadCount++;
          localStorage.setItem('user_notifications', JSON.stringify(this.notifications)); // Save to localStorage
          this.cdRef.detectChanges();
        }
      });
    }
  }
  handleMenuClick(item: any) { if (item.action === 'logout') { this.logout(); } else if (item.route) { this.router.navigate([item.route]); } }
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  toggleProfileDropdown() {
    this.isProfileOpen = !this.isProfileOpen;
  }
  navigateToProfile(){
    this.router.navigate(["/profile"]);
  }
  toggleNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    
    // ✅ Hide badge when dropdown is opened
    if (this.isNotificationsOpen) {
      this.markNotificationsAsRead();
      this.unReadCount = 0;
    }
  }
  
  markNotificationsAsRead() {
    this.notifications = [...this.notifications]; // Keeps notifications but removes badge
  }
  
  clearNotifications() {
    this.notifications = [];
    localStorage.setItem(this.isAdmin ? 'admin_notifications' : 'user_notifications', JSON.stringify([]));// Clears all notifications
  }
  
  navigateToRequestView(){
    this.router.navigate([`${this.role?.toLowerCase()}/requests`])
  }
  logout() {
    this.authService.logout();
  }
}
