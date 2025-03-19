import { Component, OnInit } from '@angular/core';
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // ✅ Import HttpClient
import { CycleService } from '../../registrations/cycle.service';
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
    this.http.get<any[]>("http://localhost:8082/cycles/all", this.getHttpOptions()).subscribe(
      (data) => {
        this.cyclesList = data.filter(cycle => cycle.status === "Borrowed");
      },
      (error) => {
        this.toast.error("Error fetching cycles!");
      }
    );
  }

  fetchKeys() {
    this.http.get<any[]>("http://localhost:8082/keys/all", this.getHttpOptions()).subscribe(
      (data) => {
        this.keysList = data.filter(key => key.status === "Borrowed");
      },
      (error) => {
        this.toast.error("Error fetching keys!");
      }
    );
  }

  downloadQr() {
    if (!this.cycleId) {
      this.toast.error("Please enter a Cycle Number/Name");
      return;
    }
    const filename = `QR_${this.cycleId}.png`;
    this.cycleService.downloadQrCode(filename).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'image/png' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${this.cycleId}_QRCode.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        this.toast.error("Resource Not Found!!");
      }
    );
  }

  navigateToCycleRegistrationForm() {
    this.router.navigate(["/admin/cycles/register"]);
  }

  navigateToKeyRegistrationForm() {
    this.router.navigate(["/admin/keys/register"]);
  }

  navigateToEditUserDetails() {
    this.router.navigate(["/admin/users/edit"]);
  }
}
