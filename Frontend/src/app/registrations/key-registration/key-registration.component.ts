import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeyService } from './key.service';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../navbar/navbar.component";
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
import { error } from 'console';
@Component({
  selector: 'app-key-registration',
  templateUrl: './key-registration.component.html',
  styleUrls: ['./key-registration.component.css'],
  imports: [FormsModule, CommonModule, NavbarLoggedComponent]
})
export class KeyRegistrationComponent {
  location:string = "";
  keyId : string = "";
  constructor(private keyService:KeyService,private toast:ToastrService){}
  registerKey(){
    this.keyId = this.keyId.trim();
    if (!this.keyId || !this.location) {
      alert('Please enter all details');
      return;
    }
    if (!/^\d+$/.test(this.keyId)) {  // ✅ Ensure only digits are entered
      this.toast.error('Key ID must be a valid integer.');
      return;
    }
    this.keyService.registerKey(this.location,this.keyId).subscribe(
      response =>{
        this.toast.success(`Successfully registered Classroom ${this.location} - ${this.keyId}`)
        this.keyId = '';
        this.location = '';
      },
      error=>{
        this.toast.error("Unable to register key")
      }
    )
  }

}
