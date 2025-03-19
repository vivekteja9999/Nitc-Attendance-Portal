import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common"
import { FilterPipe } from './filter.pipe';
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
@Component({
  selector: 'app-cycle-list',
  templateUrl: './cycle-list.component.html',
  styleUrls: ['./cycle-list.component.css'],
  imports: [FormsModule, CommonModule, NavbarLoggedComponent]
})
export class CycleListComponent implements OnInit {
  searchQuery: string = '';
  availableCycles: any[] = [];
  borrowedCycles: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadCycles();
  }
  getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }
  deleteCycle(cycleId: string) {
    this.http.post(`http://localhost:8082/cycles/delete/${cycleId}`, {} ,this.getHttpOptions()).subscribe({
      next: () => { 
        this.loadCycles();
      },
      error: (err) => { 
        console.error('Failed to delete cycle:', err);
      }
    });
  }
  loadCycles() {
    this.http.get<any[]>('http://localhost:8082/cycles/all',{...this.getHttpOptions()}).subscribe(
      (data) => {
        console.log("Cycles Data:", data);
        this.availableCycles = data
        this.borrowedCycles = data.filter(cycle => cycle.status === 'Borrowed');
      },
      (error) => {
        console.error('Error fetching cycles:', error);
      }
    );
  }
  get filteredAvailableCycles() {
    return this.availableCycles.filter(cycle =>
      cycle.cycleId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      cycle.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get filteredBorrowedCycles() {
    return this.borrowedCycles.filter(cycle =>
      cycle.cycleId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      cycle.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (cycle.borrower && cycle.borrower.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }
  goToBorrowCycle(cycleId: string) {
    this.router.navigate(['/borrow-cycle', cycleId]);
  }
}
