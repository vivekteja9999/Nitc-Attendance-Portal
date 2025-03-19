import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebSocketService } from '../../util/websocket.service';
import { NavbarLoggedComponent } from '../../navbar_loggedin/navbar_loggedin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [NavbarLoggedComponent, CommonModule, FormsModule],
})
export class AdminComponent implements OnInit {
  borrowRequests: any[] = [];
  searchQuery: string = '';
  selectedStatus: string = 'All';
  filteredRequests: any[] = [];
  selectedType: string = 'All';
  sortOrder:string = "latest";
  cycleRequests: any[] = [];
  keyRequests: any[] = [];
  constructor(private http: HttpClient, private webSocketService: WebSocketService, private cdRef: ChangeDetectorRef,private toast:ToastrService) {}

  ngOnInit() {
    this.fetchRequests();

    // ✅ Subscribe to Admin Borrow Request Updates via WebSockets
    this.webSocketService.adminNotifications$.subscribe((messages) => {
      if (Array.isArray(messages)) {
        this.borrowRequests = messages;
      } else {
        this.borrowRequests = [messages];
      }
      this.cdRef.detectChanges();
      this.fetchRequests();
    });
  }

  getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? Bearer ${token} : '',
      }),
    };
  }

  fetchRequests() {
    const cycleRequests$ = this.http.get('http://localhost:8082/admin/borrow-requests', this.getHttpOptions());
  const keyRequests$ = this.http.get('http://localhost:8082/admin/key-borrow-requests', this.getHttpOptions());

  forkJoin([cycleRequests$, keyRequests$]).subscribe(([cycleRequests, keyRequests]: any[]) => {
    this.cycleRequests = cycleRequests;
    this.keyRequests = keyRequests;
    console.log(this.keyRequests[0].startTime);
    this.borrowRequests = [...this.cycleRequests, ...this.keyRequests].map(request => ({
      ...request,
      startTime: this.formatTime(request.startTime),
      endTime: this.formatTime(request.endTime)
    
    }
  ));
    this.applyFilters();
    this.cdRef.detectChanges();
  });
  }
  

  approveRequest(requestId: number) {
    this.http
      .post(http://localhost:8082/admin/approve/${requestId}, {}, this.getHttpOptions())
      .subscribe(() => {
        this.toast.success("Approved request!!")
        this.fetchRequests(); // Refresh list
      });
  }

  denyRequest(requestId: number) {
    this.http
      .post(http://localhost:8082/admin/deny/${requestId}, {}, this.getHttpOptions())
      .subscribe(() => {
        this.toast.error("Rejected request!!")
        this.fetchRequests(); // Refresh list
      });
  }
  formatTime(time: any): string {
    if (!time) return ''; // Handle null values
  
    if (typeof time === 'string') {
      return time; // If already a string, return as is
    } else if (typeof time === 'object' && time.hour !== undefined) {
      // Convert LocalTime object { hour, minute, second } to string
      return ${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')};
    }
  
    return ''; // Default empty string if unknown format
  }
  approveReturnRequest(requestId:number){
    this.http.post(http://localhost:8082/admin/approve-return/${requestId},{},this.getHttpOptions()).subscribe(()=>{
      this.toast.info("Return Request Approved");
      this.fetchRequests();
    })
  }
  denyReturnRequest(requestId:number){
    this.http.post(http://localhost:8082/admin/deny-return/${requestId},{},this.getHttpOptions()).subscribe(()=>{
      this.toast.info("Return Request Denied");
      this.fetchRequests();
    })
  }
  setFilter(status: string) {
    this.selectedStatus = status;
    this.applyFilters();
  }
  applyFilters() {
    this.filteredRequests = this.borrowRequests.filter(request => {
      const matchesSearch = this.searchQuery
        ? request.borrowerEmail.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      const matchesType =
        this.selectedType === 'All' ||
        (this.selectedType === 'Cycle' && request.cycleId) ||
        (this.selectedType === 'Key' && request.keyId);
      const matchesStatus = this.selectedStatus === 'All'
        ? true
        : request.status === this.selectedStatus;
  
      return matchesSearch && matchesStatus && matchesType; 
    }).sort((a, b) => {
      if (this.sortOrder === 'latest') {
        return new Date(b.requestTime).getTime() - new Date(a.requestTime).getTime();
      } else {
        return new Date(a.requestTime).getTime() - new Date(b.requestTime).getTime();
      }
    });
  }  
  approveKeyRequest(requestId: number) {
    this.http
      .post(http://localhost:8082/admin/approve-key/${requestId}, {}, this.getHttpOptions())
      .subscribe(() => {
        this.toast.success("Approved key request!!");
        this.fetchRequests(); // Refresh list
      });
  }
  
  denyKeyRequest(requestId: number) {
    this.http
      .post(http://localhost:8082/admin/deny-key/${requestId}, {}, this.getHttpOptions())
      .subscribe(() => {
        this.toast.error("Rejected key request!!");
        this.fetchRequests(); // Refresh list
      });
  }
  approveReturnKeyRequest(requestId:number){
    this.http.post(http://localhost:8082/admin/approve-key-return/${requestId},{},this.getHttpOptions()).subscribe(()=>{
      this.toast.info("Return Request Approved");
      this.fetchRequests();
    })
  }
  denyReturnKeyRequest(requestId:number){
    this.http.post(http://localhost:8082/admin/deny-key-return/${requestId},{},this.getHttpOptions()).subscribe(()=>{
      this.toast.info("Return Request Denied");
      this.fetchRequests();
    })
  }
  setTypeFilter(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }
}