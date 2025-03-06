import { Component ,OnInit} from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import {CommonModule} from '@angular/common';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-user-dashboard',
  imports: [NavbarComponent,CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  role: string = "";
  constructor(private authService: AuthService){}
  ngOnInit(): void {
      this.authService.getUserDetails().subscribe(
        user =>{
          this.firstName = user.firstname;
          this.lastName = user.lastname;
          this.email = user.email;
          this.role = user.role;  
        },
        error=>{
          console.error("Error fetching user details", error);
        }
      )
  }
  availableResources = [{name: 'Cycle 1'},{name: 'Cycle 3'}]
  borrowedItems = [{name: 'Cycle 2'}]
  requestResource(resource: any){
    console.log('Requesting resource', resource);
  }
  returnResource(resource: any){
    console.log('Returning resource', resource);
  }
  logout(){
    this.authService.logout();
  }
}
