import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../navbar/navbar.component";
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
import { error } from 'console';
import { SubjectService } from './subject.service';


@Component({
  selector: 'app-subject-registration',
  imports: [NavbarLoggedComponent,FormsModule],
  templateUrl: './subject-registration.component.html',
  styleUrl: './subject-registration.component.css'
})
export class SubjectRegistrationComponent {
  subjectname:string = "";
  subjectcode : string = "";
  // teachername : string = "";
   constructor(private subjectservice:SubjectService  ,private toast:ToastrService){}
    registersubject(){
      this.subjectname= this.subjectname.trim();
      // this.teachername=this.teachername.trim();
      if (!this.subjectcode || !this.subjectname) {
        alert('Please enter all details');
        return;
      }
      this.subjectservice.registerSubject(this.subjectname,this.subjectcode  ).subscribe(
        ( response : any ) =>{
          this.toast.success(`Successfully registered Subject ${this.subjectname} - ${this.subjectcode}`)
          this.subjectcode = '';
          this.subjectname = '';
        },
        ( error : any ) =>{
          this.toast.error("Unable to register subject")
        }
      )
    }
  
}
