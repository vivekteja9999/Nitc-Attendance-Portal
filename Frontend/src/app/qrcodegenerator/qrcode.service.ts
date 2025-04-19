import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QRCodeService {
  private apiUrl = 'http://localhost:8082/qr/generate'; // Change to your backend URL

  constructor(private http: HttpClient) {}

  generateQRCode(subjectCode: string, subjectName: string, sectionName: string, email:string , latitude: number, longitude: number): Observable<any> {
    const params = {
      subjectCode,
      subjectName,
      sectionName,
      email,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    };

    return this.http.post<any>(this.apiUrl, null, { params });
  }
}
