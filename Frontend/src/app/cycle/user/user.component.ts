import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../util/websocket.service';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarLoggedComponent } from "../../../navbar_loggedin/navbar_loggedin.component";
import { request } from 'http';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [FormsModule, CommonModule, NavbarLoggedComponent]
})
export class UserComponent implements OnInit {
  sortOrder:string = "latest";
  notifications: any[] = [];
  borrowRequests: any[] = [];
  filteredRequests:any[] = [];
  searchQuery: string = '';
  selectedStatus: string = '';
  email:string | null = "";
  constructor(private webSocketService: WebSocketService,private http:HttpClient) {}

  ngOnInit() {
    this.email = localStorage.getItem("email");
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
  fetchRequests(){
    this.http.get(`http://localhost:8082/cycles/requests/${this.email}`,this.getHttpOptions()).subscribe((requests:any)=>{
      this.borrowRequests = requests;
      this.applyFilters();
    })
  }
  applyFilters() {
    this.filteredRequests = this.borrowRequests.filter(request => {
      return (
        (this.selectedStatus === '' || request.status === this.selectedStatus) &&
        (this.searchQuery === '' || request.cycleId.toString().includes(this.searchQuery))
      );
    }).sort((a, b) => {
      if (this.sortOrder === 'latest') {
        return new Date(b.requestTime).getTime() - new Date(a.requestTime).getTime();
      } else {
        return new Date(a.requestTime).getTime() - new Date(b.requestTime).getTime();
      }
    })
    ;
  }
}
