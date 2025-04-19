import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateSubjectService {
    // Use baseUrl without '/save' so GET and DELETE work correctly.
    private baseUrl = 'http://localhost:8082/subject-details';

    constructor(private http: HttpClient) {}

    // Helper method to set headers
    private getHttpOptions() {
      const token = localStorage.getItem('token');
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        })
      };
    }
  
    // Save subjects for a user (POST to /save)
    saveUserSubjects(subjectDetails: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/save`, subjectDetails, this.getHttpOptions());
    }

    // Get all subjects assigned to a particular user (GET from /{email})
    getUserSubjects(email: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/${email}`, this.getHttpOptions());
    }
    
    // Remove a subject assigned to a user (DELETE to /{email}/{subjectId})
    deleteUserSubject(email: string, subjectId: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${email}/${subjectId}`, this.getHttpOptions());
    }
}
