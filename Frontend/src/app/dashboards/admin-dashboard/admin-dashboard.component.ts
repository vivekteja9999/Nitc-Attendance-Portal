import { Component, OnInit } from '@angular/core';
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // ✅ Import HttpClient
import { CycleService } from '../../registrations/cycle-registration/cycle.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NavbarLoggedComponent, FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  cycleId: any = "";
  keysList: any[] = [];
  cyclesList: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient, // ✅ Inject HttpClient
    private cycleService: CycleService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.fetchCycles();
    this.fetchKeys();
  }

  getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      })
    };
  }

  fetchCycles() {
    this.http.get<any[]>("http://localhost:8082/subjects/all", this.getHttpOptions()).subscribe(
      (data) => {
        this.cyclesList = data.filter(cycle => cycle.status === "Borrowed");
      },
      (error) => {
        
      }
    );
  }

  fetchKeys() {
    this.http.get<any[]>("http://localhost:8082/classes/all", this.getHttpOptions()).subscribe(
      (data) => {
        this.keysList = data.filter(key => key.status === "Borrowed");
      },
      (error) => {
       
      }
    );
  }

navigateTostudentdetails()
{
  this.router.navigate(["/admin/studentreport"]);
}
navigatetobranch()
{
  this.router.navigate(["/admin/branch"]);
}

  navigateToEditUserDetails() {
    this.router.navigate(["/admin/users/edit"]);
  }
}
