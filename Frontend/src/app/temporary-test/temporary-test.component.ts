import { Component } from '@angular/core';
import { NavbarLoggedComponent } from "../navbar_loggedin/navbar_loggedin.component";
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassService } from '../registrations/class-registration/class.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UpdateSubjectService } from '../update-subjects/update-subjects.service';
import { SubjectService } from '../registrations/subject-registration/subject.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-temporary-test',
  imports: [FormsModule, CommonModule, NavbarLoggedComponent],
  templateUrl: './temporary-test.component.html',
  styleUrl: './temporary-test.component.css'
})
export class TemporaryTestComponent {
  subjects: any[] = [];
  filteredSubjects: any[] = [];
  filteredClasses: any[] = [];
  selectedSubject: string | null = null;
  selectedSections: string[] = [];  // ✅ Allow multiple sections selection
  subjectCode: string = '';
  qrCodeUrl: SafeUrl | null = null;

  isAdmin: boolean = false;
  email: string = "";
  role: string = "";
  latitude: number | null = null;
  longitude: number | null = null;

  constructor(
    private http: HttpClient,
    private route: Router,
    private authService: AuthService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private toast: ToastrService,
    private updateSubjectService: UpdateSubjectService, 
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.fetchUserDetails();
    this.loadSections();
    this.loadSubjects();
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

  fetchUserDetails() {
    this.http.get<any>("http://localhost:8082/user/details", this.getHttpOptions()).subscribe(
      user => {
        this.email = user.email;
        this.role = user.role.toLowerCase();
        this.isAdmin = this.role === "admin";
        this.loadSubjects();
      },
      error => {
        console.error("Failed to fetch user details", error);
      }
    );
  }

  loadSections() {
    this.classService.getAllClasses().subscribe(
      (data: any) => {
        this.filteredClasses = data;
      },
      error => {
        console.error("Failed to load class sections", error);
      }
    );
  }

  loadSubjects() {
    this.updateSubjectService.getUserSubjects(this.email).subscribe(
      (data: any) => {
        this.subjects = data;
        this.filteredSubjects = data;
      },
      error => {
        console.error("Failed to load assigned subjects", error);
      }
    );
  }

  updateCourseCode() {
    const selected = this.subjects.find(s => s.subjectName === this.selectedSubject);
    this.subjectCode = selected ? selected.subjectCode : '';
  }

  // ✅ Toggle Section Selection for Multi-Select Checkboxes
  toggleSectionSelection(sectionId: string) {
    const index = this.selectedSections.indexOf(sectionId);
    if (index > -1) {
      this.selectedSections.splice(index, 1); // Remove section if already selected
    } else {
      this.selectedSections.push(sectionId); // Add new selection
    }
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

  async generateQRCode() {
    if (!this.selectedSections.length || !this.selectedSubject) {
      this.toast.error("Select at least one Section and Subject.");
      return;
    }

    try {
      const location = await this.getLocation();
      this.latitude = location.lat;
      this.longitude = location.lng;

      const qrData = {
        subject_codes: [this.subjectCode],   // ✅ Send as list
        subject_names: [this.selectedSubject], // ✅ Send as list
        faculty_email: this.email,
        section_names: this.selectedSections,
        latitude: this.latitude,
        longitude: this.longitude,
        generated_time: new Date().toISOString()
      };

      console.log("📤 Sending QR Data:", qrData);

      this.http.post("http://localhost:8082/qr/generate", qrData, {
        ...this.getHttpOptions(),
        responseType: 'blob'
      }).subscribe(
        (blob: Blob) => {
          console.log("✅ QR Code Generated Successfully");

          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = "qr_code.png";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(blobUrl);

          this.incrementTotalClasses();
          this.toast.success("QR Code Downloaded Successfully!");
        },
        error => {
          this.toast.error("Failed to generate QR Code.");
          console.error("QR Code Generation Error:", error);
        }
      );

    } catch (error) {
      this.toast.error(typeof error === 'string' ? error : 'An unexpected error occurred');
      console.error("Location Error:", error);
    }
}

incrementTotalClasses() {
  const data = {
    facultyEmail: this.email,
    facultyName: this.email.split('@')[0],
    subjectCode: this.subjectCode,
    subjectName: this.selectedSubject,
    sectionNames: this.selectedSections  // ✅ Multiple sections
  };

  this.http.post<{ message: string }>("http://localhost:8082/total-classes/increment", data, this.getHttpOptions())
    .subscribe(
      response => {
        console.log("Total classes incremented:", response.message);
      },
      error => {
        console.error("Increment Total Classes Error:", error);
      }
    );
}

}
