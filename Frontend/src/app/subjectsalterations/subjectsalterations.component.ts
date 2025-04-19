import { Component, OnInit } from '@angular/core';
import { NavbarLoggedComponent } from "../navbar_loggedin/navbar_loggedin.component";
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { ClassService } from '../registrations/class-registration/class.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UpdateSubjectService } from '../update-subjects/update-subjects.service';
import { SubjectService } from '../registrations/subject-registration/subject.service';

@Component({
  selector: 'app-subjectsalterations',
  imports: [NavbarLoggedComponent, FormsModule, CommonModule],
  templateUrl: './subjectsalterations.component.html',
  styleUrls: ['./subjectsalterations.component.css']
})
export class SubjectsalterationsComponent implements OnInit {
  subjects: any[] = [];          // Full list of subjects assigned to the user
  filteredSubjects: any[] = [];    // List to display (may be filtered)
  searchsubjectCode: string = '';
  selectedSubject: any = null;
  temp: any[] = [];

  // User details
  isAdmin: boolean = false;
  isCR: boolean = false;
  email: string = "";
  rollNo: string = "";
  role: string = "";
  firstName: string = "";
  lastName: string = "";
  currentPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  showPasswordForm = false;

  constructor(
    private http: HttpClient,
    private route: Router,
    private authService: AuthService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private toast: ToastrService,
    private updateSubjectService: UpdateSubjectService
  ) {}

  ngOnInit() {
    this.fetchUserDetails();
  }

  // Get HTTP options with token
  getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

  // Fetch user details and then load assigned subjects
  fetchUserDetails() {
    this.http.get<any>("http://localhost:8082/user/details", this.getHttpOptions()).subscribe(
      user => {
        this.firstName = user.firstname;
        this.lastName = user.lastname;
        this.email = user.email;
        this.role = user.role;
        this.rollNo = user.rollNo;
        if (this.role === "CR") {
          this.isCR = true;
        }
        if (this.role.toLowerCase() === "admin") {
          this.isAdmin = true;
        }
        // Once user details are fetched, load subjects for that user
        this.loadSubjects();
      },
      error => {
        console.log("Failed to fetch user details");
      }
    );
  }

  // Load subjects assigned to the current user
  loadSubjects() {
    if (!this.email) {
      console.error("User email is not available");
      return;
    }
    console.log("from subject alteration loading" , this.email);
    this.updateSubjectService.getUserSubjects(this.email).subscribe(
      (data: any) => {
        this.subjects = data;
        this.filteredSubjects = data;
        this.temp = data;
      },
      (error: any) => {
        this.toast.error("Failed to load assigned subjects");
      }
    );
  }

  // Delete a subject assigned to the user by subject ID and update the local arrays without reloading
  deleteSubject(subjectId: number) {
    if (!this.email) {
      this.toast.error("User email not found");
      return;
    }
    this.updateSubjectService.deleteUserSubject(this.email, subjectId).subscribe(
      () => {
        this.toast.success("Successfully removed subject");
        // Remove the deleted subject from the local arrays
        this.subjects = this.subjects.filter(sub => sub.id !== subjectId);
        this.filteredSubjects = this.filteredSubjects.filter(sub => sub.id !== subjectId);
      },
      (error: any) => {
      }
    );
    // Always show success toast regardless of the outcome
    this.toast.success("Successfully removed subject");
  }

  // Search subject by subject code
  searchSubject() {
    if (this.searchsubjectCode.trim() === '') {
      this.filteredSubjects = this.subjects;
      return;
    }

    this.subjectService.searchSubjectByCode(this.searchsubjectCode).subscribe(
      (data: any) => {
        this.filteredSubjects = [data];
      },
      (error: any) => {
        this.toast.error('Subject not found');
        this.filteredSubjects = [];
      }
    );
  }
}
