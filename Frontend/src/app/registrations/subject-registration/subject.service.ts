import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8082/subjects/register';
  private baseUrl='http://localhost:8082/subjects';

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
  registerSubject(subjectName: string, subjectCode: string): Observable<any> {
    const requestBody = {
      subjectName,  // Ensure these match the backend field names
      subjectCode,
    };
    return this.http.post(this.apiUrl, requestBody, this.getHttpOptions());
  }
  getAllSubjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`, this.getHttpOptions());
  }

  searchSubjectByCode(subjectCode: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/code/${subjectCode}`, this.getHttpOptions());
  }
  

  deleteSubject(subjectId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${subjectId}`, this.getHttpOptions());
  }
}
