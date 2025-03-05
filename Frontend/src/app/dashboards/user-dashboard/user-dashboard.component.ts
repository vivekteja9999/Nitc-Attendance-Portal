import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-user-dashboard',
  imports: [NavbarComponent,CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  availableResources = [{name: 'Cycle 1'},{name: 'Cycle 3'}]
  borrowedItems = [{name: 'Cycle 2'}]
  requestResource(resource: any){
    console.log('Requesting resource', resource);
  }
  returnResource(resource: any){
    console.log('Returning resource', resource);
  }
}
