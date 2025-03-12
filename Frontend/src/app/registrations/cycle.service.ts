import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CycleService {
  private apiUrl = "http://localhost:8082/cycles/register";

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

  registerCycle(cycleId: string, location: string, gearType: string): Observable<any> {
    const requestBody = { cycleId, location, gearType }; // ✅ Correctly send request body
    return this.http.post<any>(this.apiUrl, requestBody, this.getHttpOptions());
  }
  downloadQrCode(filename: string) {
    const token = localStorage.getItem('token');  // ✅ Retrieve token
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.get(`http://localhost:8082/cycles/download?filename=${filename}`, {
      headers,
      responseType: 'blob' // ✅ Ensure response is treated as a file
    });
  }
  
}
