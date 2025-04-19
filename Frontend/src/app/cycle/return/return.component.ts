import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebSocketService } from '../../../util/websocket.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarLoggedComponent } from '../../../navbar_loggedin/navbar_loggedin.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CycleListComponent } from '../../../util/cycle-list/cycle-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css'],
  imports: [FormsModule, CommonModule, NavbarLoggedComponent, ZXingScannerModule]
})
export class ReturnComponent implements OnInit {
  scannedCycleId: string = '';
  userEmail: string | null = null;
  notifications: string[] = []; // ✅ Store user notifications
  borrowedCycles: any[] = [];
  isScannerActive: boolean = false;
  role: string = '';

  constructor(private http: HttpClient, private webSocketService: WebSocketService, private toast: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email');
    this.role = localStorage.getItem('role')?.toLowerCase() || 'user';

    // ✅ Subscribe to User-Specific Notifications
    this.webSocketService.userNotifications$.subscribe((message) => {
      console.log('Received user notification:', message);
      if (message) {
        this.notifications.push(message);
      }
    });
  }

  toggleScanner() {
    this.isScannerActive = !this.isScannerActive;
  }

  onScanSuccess(qrData: string) {
    this.scannedCycleId = qrData;
    this.isScannerActive = false;
    this.toast.success(`Scanned Cycle ID: ${this.scannedCycleId}`);
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

  requestReturn() {
    if (!this.scannedCycleId) {
      this.toast.error('Please scan a valid cycle QR code before requesting a return.');
      return;
    }

    const requestData = { cycleId: this.scannedCycleId, borrowerEmail: this.userEmail };
    this.toast.info('Sending return request...');

    this.http.post('http://localhost:8082/admin/request-return', requestData, this.getHttpOptions())
      .subscribe({
        next: () => {
          this.toast.success(`Return request sent for cycle: ${this.scannedCycleId}`);
          if (this.role) {
            this.router.navigate([`${this.role}/dashboard`]);
          }
        },
        error: () => {
          this.toast.error('Could not request cycle return.');
        }
      });
  }
}
