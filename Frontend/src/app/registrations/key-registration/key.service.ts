import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  private apiUrl = 'http://localhost:8082/keys/register';

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
  registerKey(location:string,keyId:string): Observable<any> {
    const requestBody = {keyId,location}
    return this.http.post(this.apiUrl, requestBody,this.getHttpOptions());
  }
}
