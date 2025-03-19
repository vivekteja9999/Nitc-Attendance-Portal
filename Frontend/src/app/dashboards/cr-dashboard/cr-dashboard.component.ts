import { Component, OnInit } from '@angular/core';
import { NavbarLoggedComponent } from '../../navbar_loggedin/navbar_loggedin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cr-dashboard',
  imports: [NavbarLoggedComponent,FormsModule,CommonModule],
  templateUrl: './cr-dashboard.component.html',
  styleUrl: './cr-dashboard.component.css'
})
export class CrDashboardComponent implements OnInit {
  constructor(private router:Router){}
  allocatedResources:any[] = [];
  ngOnInit(): void {
    
  }
  sendRequestForKey(){
    this.router.navigate(["key/borrow"])
  }
  sendRequestForCycle(){
    this.router.navigate(["cycles/borrow"])
  }
  returnKey(){
    this.router.navigate(["key/return"])
  }
  returnCycle(){
    this.router.navigate(["cycles/return"])
  }
  viewRequests(){
    this.router.navigate(["cr/requests"])
  }
}
