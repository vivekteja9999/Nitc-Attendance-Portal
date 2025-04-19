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

  ngOnInit(): void {
    
  }
  generateqrcode(){
    this.router.navigate(['cr/generateqrcode']);
  }
  fun1()
  {
    this.router.navigate(['cr/classwise']);
  }
  fun2()
  {
    this.router.navigate(['cr/shortages']);
  }
}
