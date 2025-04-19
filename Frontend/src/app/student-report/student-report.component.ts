import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarLoggedComponent } from "../navbar_loggedin/navbar_loggedin.component";


interface SubjectAttendance {
  subjectCode: string;
  subjectName: string;
  classesAttended: number ;
  classesTaken:number ;
  percentage: number;

}

@Component({
  selector: 'app-student-report',
  imports: [CommonModule, FormsModule , NavbarLoggedComponent],
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.css']
})
export class StudentReportComponent {
  studentEmail: string = '';
  attendanceReport: SubjectAttendance[] = [];
  fakeAttendance: boolean = false;

  constructor(private http: HttpClient, private toastr: ToastrService)  {}

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }


  fetchStudentAttendance() {
    if (!this.studentEmail.trim()) {
      this.toastr.warning('Please enter a student email.');
      return;
    }

    const url = `http://localhost:8082/attendance/percentage/${this.studentEmail}`;
    this.http.get<{ [subjectCode: string]: SubjectAttendance }>(url, this.getHttpOptions())
      .subscribe(
      (data) => {
        if (!data || Object.keys(data).length === 0) {
        this.toastr.info('No attendance data found.');
        this.attendanceReport = [];
        this.fakeAttendance = false;
        return;
        }

        // Check for fake attendance
        this.fakeAttendance = data["FAKE_ATTENDANCE"]?.percentage === -1;
        delete data["FAKE_ATTENDANCE"]; // Remove special key from display

        this.attendanceReport = Object.keys(data).map((subjectCode) => ({
        subjectCode: subjectCode,
        subjectName: data[subjectCode].subjectName || "Unknown", // Use subjectName from data or default to "Unknown"
        classesAttended: data[subjectCode].classesAttended,
        classesTaken: data[subjectCode].classesTaken,
        percentage: data[subjectCode].percentage
        }));
      },
      (error) => {
        console.error(error);
        this.toastr.error('Error fetching attendance data.');
        this.attendanceReport = [];
        this.fakeAttendance = false;
      }
      );
  }
}
