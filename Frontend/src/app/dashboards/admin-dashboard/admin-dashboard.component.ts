import { Component } from '@angular/core';
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
import {Router} from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  imports: [NavbarLoggedComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router:Router){}
  navigateToCycleRegistrationForm(){
    this.router.navigate(["/cycles/register"]);
  }
}
