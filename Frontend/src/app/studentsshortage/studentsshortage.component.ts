import { Component, OnInit } from '@angular/core';
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
  selector: 'app-studentsshortage',
  imports: [FormsModule , CommonModule , NavbarLoggedComponent],
  templateUrl: './studentsshortage.component.html',
  styleUrl: './studentsshortage.component.css'
})
export class StudentsshortageComponent implements OnInit {

    count: number = 0;

    isAdmin:boolean = false;
    isCR:boolean = false;
    studentEmail:string = "";
    rollNo:string = "";
    role:string = "";
    firstName:string = "";
    lastName:string = "";
    currentPassword:string = "";
    newPassword:string = "";
    confirmPassword:string = "";
    showPasswordForm = false;
  
  
  
    attendanceReport: SubjectAttendance[] = [];
    fakeAttendance: boolean = false;
  
    constructor(private http: HttpClient, private toastr: ToastrService)  {}
  
    ngOnInit() {
      this.fetchUserDetails().then(() => {
        if (this.studentEmail) {
          this.fetchStudentAttendance();
        }
      });
    }

    incrementcount()
    {
      this.count=this.count+1;
    }
    
    fetchUserDetails(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.http.get<any>("http://localhost:8082/user/details", this.getHttpOptions()).subscribe(
          user => {
            this.firstName = user.firstname;
            this.lastName = user.lastname;
            this.studentEmail = user.email;
            this.role = user.role;
            this.rollNo = user.rollNo;
            console.log(this.role);
            if (this.role === "CR") {
              this.isCR = true;
            }
            if (this.role.toLowerCase() === "admin") {
              this.isAdmin = true;
            }
            console.log(this.isAdmin);
            console.log(this.isCR);
            resolve();
          },
          error => {
            console.log("failed to fetch user details");
            reject(error);
          }
        );
      });
    }
  
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
      console.log(1);
      console.log(this.studentEmail);
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
