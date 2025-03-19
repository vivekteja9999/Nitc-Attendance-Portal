import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../util/websocket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarLoggedComponent } from '../../navbar_loggedin/navbar_loggedin.component';

@Component({
  selector: 'app-cr',
  imports: [FormsModule, CommonModule, NavbarLoggedComponent],
  templateUrl: './cr.component.html',
  styleUrl: './cr.component.css'
})
export class CrComponent implements OnInit {
  sortOrder: string = 'latest';
  notifications: any[] = [];
  borrowRequests: any[] = [];
  keyBorrowRequests: any[] = [];
  combinedRequests: any[] = [];
  filteredRequests: any[] = [];
  searchQuery: string = '';
  selectedStatus: string = 'All';
  email: string | null = '';

  constructor(private webSocketService: WebSocketService, private http: HttpClient) {}

  ngOnInit() {
    this.email = localStorage.getItem('email');

    // ✅ Listen for user-specific notifications
    this.webSocketService.userNotifications$.subscribe((message: any) => {
      this.notifications.push(message.message);
    });

    this.fetchRequests();
  }

  getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      }),
    };
  }

  fetchRequests() {
    // Fetch cycle borrow requests
    this.http.get(`http://localhost:8082/cycles/requests/${this.email}`, this.getHttpOptions()).subscribe((requests: any) => {
      this.borrowRequests = requests.map((req: any) => ({ ...req, type: 'cycle' }));
      this.mergeAndFilterRequests();
    });

    // Fetch key borrow requests
    this.http.get(`http://localhost:8082/keys/requests/${this.email}`, this.getHttpOptions()).subscribe((requests: any) => {
      this.keyBorrowRequests = requests.map((req: any) => ({ ...req, type: 'key' }));
      this.mergeAndFilterRequests();
    });
  }

  mergeAndFilterRequests() {
    // ✅ Merge both cycle and key requests
    this.combinedRequests = [...this.borrowRequests, ...this.keyBorrowRequests];

    // ✅ Apply sorting and filtering
    this.applyFilters();
  }

  applyFilters() {
    this.filteredRequests = this.combinedRequests.filter(request => {
      return (
        (this.selectedStatus === 'All' || request.status === this.selectedStatus) &&
        (this.searchQuery === '' || request.borrowerEmail?.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }).sort((a, b) => {
      return this.sortOrder === 'latest'
        ? new Date(b.requestTime).getTime() - new Date(a.requestTime).getTime()
        : new Date(a.requestTime).getTime() - new Date(b.requestTime).getTime();
    });
  }
}