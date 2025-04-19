import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../registrations/subject-registration/subject.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule} from '@angular/forms';
import { CommonModule , NgIf } from '@angular/common';
import { NavbarLoggedComponent } from '../navbar_loggedin/navbar_loggedin.component';
import { ClassService } from '../registrations/class-registration/class.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { response } from 'express';
import { UpdateSubjectService } from './update-subjects.service';

@Component({
  selector: 'app-update-subjects',
  imports: [FormsModule,CommonModule , NavbarLoggedComponent] ,
  templateUrl: './update-subjects.component.html',
  styleUrls: ['./update-subjects.component.css']
})
export class UpdateSubjectsComponent implements OnInit {
   subjects: any[] = [];
   filteredSubjects: any[] = [];
   searchsubjectCode: string = '';
   selectedSubject: any = null;


   addedSubjects: any[] = [];

   //fetching user details
   isAdmin:boolean = false;
   isCR:boolean = false;
   email:string = "";
   rollNo:string = "";
   role:string = "";
   firstName:string = "";
   lastName:string = "";
   currentPassword:string = "";
   newPassword:string = "";
   confirmPassword:string = "";
   showPasswordForm = false;
  
 
   constructor(private http:HttpClient,private route:Router,private authService:AuthService,private classService:ClassService , private subjectService: SubjectService, private toast: ToastrService , private updateSubjectService:UpdateSubjectService) {}
 
   ngOnInit() {
    this.fetchUserDetails();
     this.loadSubjects();
   }
 
   loadSubjects() {
     this.subjectService.getAllSubjects().subscribe(
       (data : any) => {
         this.subjects = data;
         this.filteredSubjects = data; // Ensure filteredSubjects is updated
       },
       (error : any) => {
         this.toast.error('Failed to fetch subjects');
       }
     );
   }
 
   searchSubject() {
     if (this.searchsubjectCode.trim() === '') {
       this.filteredSubjects = this.subjects;
       return;
     }
 
     this.subjectService.searchSubjectByCode(this.searchsubjectCode).subscribe(
       (data : any) => {
         this.filteredSubjects = [data]; 
       // Display only the found subject
       },
       (error : any) => {
         this.toast.error('Subject not found');
         this.filteredSubjects = []; // Clear the table if no subject found
       }
     );
   }

 
   deleteSubject(subjectId: number) {
     if (confirm('Are you sure you want to delete this subject?')) {
       this.subjectService.deleteSubject(subjectId).subscribe(
         () => {
           this.toast.success('Subject deleted successfully');
           this.loadSubjects(); // Refresh subjects after deletion
         },
         (error : any ) => {
           this.toast.error('Failed to delete subject');
           console.error(error);
         }
       );
     }
   }

   AddSubject(subjectId: number ,  subjectCode: string , subjectName: string , teacherName: string){ {
    }

    const index = this.addedSubjects.findIndex(subject => 
      subject.subjectCode === subjectCode
    );
    if(index !== -1) {
      this.toast.error('Subject already added');
      return;
    }

  this.addedSubjects.push({
    subjectId: subjectId,
    subjectCode: subjectCode,
    subjectName: subjectName,
    teacherName: teacherName
  });
  this.toast.success('Subject added successfully');
  }

  deletefromadded(subjectId: number, subjectCode: string, subjectName: string, teacherName: string) {
    const index = this.addedSubjects.findIndex(subject => 
      subject.subjectCode === subjectCode
    );

    if (index !== -1) {
      this.addedSubjects.splice(index, 1);
      this.toast.success('Subject removed successfully');
    } else {
      this.toast.error('Subject not found in the added subjects list');
    }
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
  fetchUserDetails(){
    this.http.get<any>("http://localhost:8082/user/details",this.getHttpOptions()).subscribe(
      user=>{
        this.firstName = user.firstname;
        this.lastName = user.lastname;
        this.email = user.email;
        this.role = user.role;
        this.rollNo = user.rollNo;
        console.log(this.role);
        if(this.role === "CR"){
          this.isCR = true;
        }
        if(this.role.toLowerCase() === "admin"){
          this.isAdmin = true;
        }
      console.log(this.isAdmin);
     console.log(this.isCR)
      },
      error=>{
        console.log("failed to fetch user details");
      }
    )
    
  }

savesubjects() {
  if (this.addedSubjects.length === 0) {
    this.toast.error('No subjects to save!');
    return;
  }

  const email = this.email; // Use the fetched email from user details
  if (!email) {
    this.toast.error('User email not found! Please login again.');
    return;
  }

  // Prepare request data
  const requestData = {
    email: email,
    subjectIds: this.addedSubjects.map(subject => subject.subjectId) // Extract subject IDs
  };

  // Call the service to save subjects
  this.updateSubjectService.saveUserSubjects(requestData).subscribe(
    (response:any) => {
      this.toast.success('Subjects saved successfully!');
      this.addedSubjects = []; // Clear the added subjects list
    },
    (error:any) => {
      this.toast.error('Failed to save subjects. Please try again.');
      console.error(error);
    }
  );
}

  
}
