import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from '../registrations/subject-registration/subject.service';
import { ClassService } from '../registrations/class-registration/class.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QRCodeService } from './qrcode.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdateSubjectService } from '../update-subjects/update-subjects.service';
import { error } from 'console';
import { NavbarLoggedComponent } from "../navbar_loggedin/navbar_loggedin.component";

@Component({
    selector: 'app-qrcodegenerator',
    imports: [FormsModule, CommonModule, NavbarLoggedComponent],  // Ensure NgxQRCodeModule is imported
    templateUrl: './qrcodegenerator.component.html',
    styleUrls: ['./qrcodegenerator.component.css'],
})
export class QRCodeGeneratorComponent implements OnInit {
    classes: string[] = [];
    filteredClasses: any[] = [];
    searchSection: string = '';
    selectedSection: string = '';
    sectionval: string = '';
    

    subjects: any[] = [];
    filteredSubjects: any[] = [];
    searchSubject: string = '';
    selectedSubject: string = '';
    subjectCode: string = '';
    temp: any[] = [];

    qrData: string | null = null;
    timeLeft: number = 90;
    countdownInterval: any;

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

    constructor(
      private updateSubjectService:UpdateSubjectService , private toastr: ToastrService, private classService: ClassService, private subjectService: SubjectService , private qrcodeService:QRCodeService ,private http:HttpClient ) {}

    ngOnInit() : void {
        this.loadClasses();
        this.loadSubjects();
        this.fetchUserDetails();
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

    loadClasses() {
    this.classService.getAllClasses().subscribe(
      (data :any) => {
        this.classes = data;
        this.filteredClasses = data;
      },
      (error: any) => {
        this.toastr.error('Failed to fetch classes');
      }
    );
  }
  loadSubjects() {
    if (!this.email) {
      console.error("User email is not available");
      return;
    }
    this.updateSubjectService.getUserSubjects(this.email).subscribe(
      (data: any) => {
        this.subjects = data;
        this.filteredSubjects = data;
         this.temp = data;
      },
      (error: any) => {
        this.toastr.error("Failed to load assigned subjects");
      }
    );
  }
  

    filterSections() {
        this.filteredClasses = this.classes.filter((s) => s.toLowerCase().includes(this.searchSection.toLowerCase()));
    }

    filterSubjects() {
        this.filteredSubjects = this.subjects.filter((s) => s.subjectName.toLowerCase().includes(this.searchSubject.toLowerCase()));
    }

    updateCourseCode() {
        const selected = this.subjects.find((s) => s.subjectCode === this.selectedSubject);
        this.subjectCode = selected ? selected.subjectCode : '';
    }

    // generateQRCode(event: Event) {
    //   event.preventDefault();

    //   if (!this.selectedSection || !this.selectedSubject || !this.subjectCode) {
    //     this.toastr.error('Please select all fields');
    //     return;
    //   }

    //   const qrPayload = {
    //     section: this.selectedSection,
    //     subjectCode: this.subjectCode,
    //     subjectName: this.selectedSubject,
    //     timestamp: new Date(),
    //   };

    //   this.qrData = JSON.stringify(qrPayload);

    //   // Call the QR code service to generate the QR code
    //   this.qrcodeService.generateQRCode(qrPayload).subscribe(
    //     (response) => {
    //       this.toastr.success('QR Code Generated Successfully!');
    //       this.startTimer();
    //     },
    //     (error) => {
    //       this.toastr.error('Failed to generate QR Code');
    //     }
    //   );
    // }
    logSection(section: string): void {

      console.log(section);
  
  }

    startTimer() {
        this.timeLeft = 60;
        clearInterval(this.countdownInterval);
        this.countdownInterval = setInterval(() => {
            if (this.timeLeft > 0) this.timeLeft--;
            else clearInterval(this.countdownInterval);
        }, 1000);
    }
}
