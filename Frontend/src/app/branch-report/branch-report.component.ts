import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarLoggedComponent } from '../navbar_loggedin/navbar_loggedin.component';

@Component({
  selector: 'app-branch-report',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarLoggedComponent],
  templateUrl: './branch-report.component.html',
  styleUrls: ['./branch-report.component.css']
})
export class BranchReportComponent implements OnInit {
  branches = ['CSE', 'ECE', 'EEE', 'MECH', 'CHEMICAL', 'CIVIL', 'PRODUCTION'];
  attendanceData: Record<string, any> = {}; // Stores branch-wise student data
  selectedBranch: string = '';
  filteredStudents: { email: string; hasFakeAttendance: boolean }[] = [];
  studentSearch: string = '';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

  ngOnInit() {
    this.fetchBranchReports();
  }

  fetchBranchReports() {
    this.http.get<Record<string, any>>('http://localhost:8082/attendance/branch-reports', this.getHttpOptions())
      .subscribe(
        (data) => {
          console.log('Fetched attendance data:', data);
          this.attendanceData = data;
        },
        (error) => console.error('Error fetching attendance reports:', error)
      );
  }

  selectBranch(branch: string) {
    console.log('Selected branch:', branch);
    this.selectedBranch = branch;
    this.filterStudents();
  }

  filterStudents() {
    if (!this.selectedBranch || !this.attendanceData[this.selectedBranch]) {
      this.filteredStudents = [];
      return;
    }

    this.filteredStudents = Object.entries(this.attendanceData[this.selectedBranch] || {})
      .map(([email, subjects]) => {
        const lowAttendanceSubjects = (subjects as any[]).filter(sub => sub.subjectName!=="Multiple Sections Detected" && sub.percentage < 80);
        const hasFakeAttendance = lowAttendanceSubjects.some(sub => sub.subjectName === "Multiple Sections Detected");

        if (lowAttendanceSubjects.length > 0) {
          console.log(lowAttendanceSubjects);
          return { email, hasFakeAttendance };
        }
        return null;
      })
      .filter((student): student is { email: string; hasFakeAttendance: boolean } => student !== null)
      .filter(student =>
        student.email.toLowerCase().includes(this.studentSearch.toLowerCase())
      );
  

    console.log('Filtered students with low attendance and fake attendance status:', this.filteredStudents);
  }
  
}
