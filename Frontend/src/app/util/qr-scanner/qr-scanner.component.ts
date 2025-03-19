import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent {
  scannedCycle: any = null;

  constructor(private http: HttpClient) {}

  onScanSuccess(scanResult: string) {
    try {
      this.scannedCycle = JSON.parse(scanResult);
    } catch (error) {
      console.error('Invalid QR Code');
    }
  }

  borrowCycle() {
    this.http.post('/api/cycles/borrow', { cycleId: this.scannedCycle.cycleId })
      .subscribe(response => {
        alert('Cycle borrowed successfully!');
        this.scannedCycle = null;  // Clear scanned cycle after borrowing
      }, error => {
        alert('Error borrowing cycle: ' + error.error);
      });
  }
}
