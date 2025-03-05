import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-qr-generator',
  imports: [FormsModule],
  templateUrl: './qr-generator.component.html',
  styleUrl: './qr-generator.component.css'
})
export class QrGeneratorComponent {
  inputValue: string = '';
  qrCode: string = '';
  constructor(private http: HttpClient) { }
  generateQr(){
    this.http.post<{qrCode:string}>('http://localhost:8082/qr/generate', {data: this.inputValue}).subscribe(
    response =>{
      this.qrCode = response.qrCode;
    }
    )
  }
}
