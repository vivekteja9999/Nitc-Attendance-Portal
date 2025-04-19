import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://localhost:8082/class/register';
  private baseUrl = 'http://localhost:8082/class';
  constructor(private http: HttpClient) {}

  // Helper method to get HTTP options with Authorization header
  private getHttpOptions() {
    const token = localStorage.getItem('token'); // Fetch token from local storage
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''  // Include token if available
      })
    };
  }

  // Subject registration API call
  registerClass(classId : string) : Observable<any> {
    const requestBody = {
      classId
    };
    return this.http.post(this.apiUrl, requestBody, this.getHttpOptions());
  }

  getAllClasses(): Observable<any[]> {
    console.log("getAll classes called")
    return this.http.get<any[]>(`${this.baseUrl}/all`, this.getHttpOptions());
  }

  searchClassByCode(classCode: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/class/${classCode}`, this.getHttpOptions());
  }

  deleteClass(classId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${classId}`, this.getHttpOptions());
}
}