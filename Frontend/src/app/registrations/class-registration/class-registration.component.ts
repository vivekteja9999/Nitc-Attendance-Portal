import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../navbar/navbar.component";
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
import { error } from 'console';
import {ClassService} from './class.service';

@Component({
  selector: 'app-class-registration',
  imports: [NavbarLoggedComponent , FormsModule],
  templateUrl: './class-registration.component.html',
  styleUrl: './class-registration.component.css'
})
export class ClassRegistrationComponent {
    classId :string = "";
    constructor(private classervice: ClassService ,private toast:ToastrService){}
     registerClass(){
       this.classId = this.classId.trim();
      
       if (!this.classId ) {
         alert('Please enter all details');
         return;
       }
       this.classervice.registerClass(this.classId ).subscribe(
         ( response : any ) =>{
           this.toast.success(`Successfully registered Section ${this.classId}`)
           this.classId='';
         
         },
         ( error : any ) =>{
           this.toast.error("Unable to register Section")
         }
       )
     }
   

}
