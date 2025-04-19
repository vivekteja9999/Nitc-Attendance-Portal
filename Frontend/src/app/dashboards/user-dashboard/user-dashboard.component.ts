import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarLoggedComponent } from '../../navbar_loggedin/navbar_loggedin.component';
import { BarcodeFormat } from '@zxing/library';
import { ClassService } from '../../registrations/class-registration/class.service';// Import ClassService
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, ZXingScannerModule, NavbarLoggedComponent , FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  showScanner: boolean = false;
  studentEmail: string = '';
  studentName: string = '';
  allowedFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  latitude: number | null = null;
  longitude: number | null = null;
  isProcessing: boolean = false; // Prevents multiple scans

  sections: any[] = []; // Holds the list of sections
  selectedSection: any = ''; // Holds the selected section

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private classService: ClassService ,
    private router: Router// Inject ClassService
  ) {
    this.fetchUserDetails(); // Fetch student details on load
    this.fetchSections(); // Fetch sections on load
  }

  fun1()
  {
    this.router.navigate(['/studentpercent']);
  }
  fun2()
  {
    this.router.navigate(['/studentshortage']);
  }

  toggleScanner() {
    this.showScanner = !this.showScanner;
  }

  fetchSections() {
    this.classService.getAllClasses().subscribe(
      (response: any) => {
        console.log(this.sections);
        this.sections = response;
      },
      error => {
        console.error("Error fetching sections:", error);
        this.toast.error("Failed to fetch sections.");
      }
    );
  }

  parseQRData(qrData: string): any {
    try {
      console.log("Raw QR Data:", qrData);
  
      // Remove line breaks and trim spaces
      const cleanedData = qrData.replace(/\n/g, ',').replace(/\s+/g, ' ').trim();
      const values = cleanedData.split(',').map(value => value.trim());
  
      if (values.length !== 7) {
        throw new Error(`Invalid QR Data Format: Expected 7 fields, but got ${values.length}`);
      }
  
      return {
        subject_code: values[0],
        subject_name: values[1],
        faculty_email: values[2],
        section_name: values[3], // Sections separated by ";"
        latitude: parseFloat(values[4]),
        longitude: parseFloat(values[5]),
        timestamp: values[6]
      };
    } catch (error) {
      console.error("Error parsing QR Data:", error);
      throw new Error("Invalid QR Data Format");
    }
  }

  async onScanSuccess(qrData: string) {
    if (!qrData || this.isProcessing) return; // Prevent multiple scans
  
    console.log("Raw QR Data:", qrData);
  
    this.isProcessing = true;
    this.showScanner = false;
  
    try {
      const qrDetails = this.parseQRData(qrData);
      console.log("Parsed QR Data:", qrDetails);
  
      // Check if the selected section is in the QR data
      const qrSections = qrDetails.section_name.split(';').map((s: string) => s.trim());
      console.log(qrSections);
      console.log(this.selectedSection);
      if (!qrSections.includes(this.selectedSection)) {
        this.toast.error("Selected section does not match QR code section.");
        this.resetScanner();
        return;
      }
  
      // Get Location
      const location = await this.getLocation();
      this.latitude = location.lat;
      this.longitude = location.lng;
  
      // Check Distance (Less than 100m)
      const distance = this.calculateDistance(this.latitude, this.longitude, qrDetails.latitude, qrDetails.longitude);
      if (distance > 100) {
        this.toast.error("You are too far from the attendance location.");
        this.resetScanner();
        return;
      }
  
      // Check Time Validity (Less than 90s)
      const qrGeneratedTime = new Date(qrDetails.timestamp);
      const currentTime = new Date();
      const timeDifference = (currentTime.getTime() - qrGeneratedTime.getTime()) / 1000; // Convert to seconds
  
      if (timeDifference > 90) {
        this.toast.error("QR code expired. Please scan a valid code.");
        this.resetScanner();
        return;
      }
  
      // Prepare Attendance Data
      const emailParts = this.studentEmail.split('_');
      this.studentName = emailParts.length > 0 ? emailParts[0] : this.studentEmail;
      const attendanceData = {
        subjectCode: qrDetails.subject_code,
        subjectName: qrDetails.subject_name,
        facultyEmail: qrDetails.faculty_email,
        studentEmail: this.studentEmail,
        studentName: this.studentName,
        sectionName: this.selectedSection,
        attendanceTime: currentTime.toISOString(),
      };
  
      console.log("Sending Attendance Data:", attendanceData);
  
      // Send Attendance Data to Backend
      this.http.post("http://localhost:8082/attendance/mark", attendanceData, this.getHttpOptions()).subscribe(
        response => {
          this.toast.success(`Attendance Marked for ${attendanceData.subjectName}!`);
          this.resetScanner();
        },
        error => {
          console.error("Attendance Error:", error);
          this.toast.success(`Attendance Marked for ${attendanceData.subjectName}!`);
          this.resetScanner();
        }
      );
  
    } catch (e) {
      console.error("Parsing Error:", e);
      this.toast.error("Invalid QR Code.");
      this.resetScanner();
    }
  }
  

  resetScanner() {
    setTimeout(() => {
      this.toggleScanner();
    }, 2000); // Small delay to avoid immediate re-scan
  }

  getLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          error => {
            reject("Location access denied.");
          }
        );
      } else {
        reject("Geolocation not supported.");
      }
    });
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  fetchUserDetails() {
    this.http.get<any>("http://localhost:8082/user/details", this.getHttpOptions()).subscribe(
      response => {
        this.studentEmail = response.email;
        this.studentName = response.name;
      },
      error => {
        console.error("Error fetching user details:", error);
        this.toast.error("Failed to fetch user details.");
      }
    );
  }

  getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }
}
