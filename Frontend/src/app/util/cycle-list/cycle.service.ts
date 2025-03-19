import { Injectable, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CycleService implements OnInit{
  private apiUrl = 'http://localhost:8082/cycles';
  email:string | null = "";
  constructor(private http: HttpClient) {}
  getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }
  ngOnInit(): void {
    this.email = localStorage.getItem("email");
  }
  getAllCycles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`,this.getHttpOptions());
  }
  getBorrowStatus(cycleId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8082/admin/borrow-status/${cycleId}`,{...this.getHttpOptions() ,params:{ email: this.email ? this.email : ""}});
  }

  returnCycle(cycleId: string): Observable<any> {
    return this.http.put<any>(`http://localhost:8082/admin/return/${cycleId}`, {email:this.email},this.getHttpOptions());
  }

  requestReturn(cycleId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/return-request`, { cycleId },this.getHttpOptions());
  }
}
