import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ClickOutsideDirective } from '../util/click-outside.directive';
import { MENU_ITEMS } from './menu-items';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common"
import {Router} from '@angular/router'; 
import {RouterModule} from '@angular/router'
@Component({
  selector: 'app-navbar-loggedin',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './navbar_loggedin.component.html',
  styleUrl: './navbar_loggedin.component.css'
})
export class NavbarLoggedComponent implements OnInit {
  constructor(private authService: AuthService){}
  isSidenavOpen = false;
  isProfileOpen = false;
  menuItems:any[] = [];
  ngOnInit() {
    const role = this.authService.getRole() as keyof typeof MENU_ITEMS;
    if(role !== null){
      this.menuItems = MENU_ITEMS[role] || MENU_ITEMS.USER;
    }
  }
   toggleSidenav(){
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  logout(){
    this.closeDropdown();
    this.authService.logout();
  }
  toggleProfileDropdown(){
    this.isProfileOpen = !this.isProfileOpen;
  }
  closeDropdown(){
    this.isProfileOpen = false;
  }
}
