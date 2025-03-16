import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8082/user';

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
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`,{...this.getHttpOptions()});
  }

  searchUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search?email=${email}`,{...this.getHttpOptions()});
  }

  updateUserRole(userId: number, role: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update-role/${userId}`, {role},this.getHttpOptions());
  }
}
