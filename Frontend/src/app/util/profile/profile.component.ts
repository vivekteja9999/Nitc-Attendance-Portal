import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
@Component({
  selector: 'app-profile',
  imports: [NavbarLoggedComponent,FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
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

togglePasswordForm() {
  this.showPasswordForm = !this.showPasswordForm;
}

  changePassword(){
    if(this.newPassword !== this.confirmPassword){
      this.toast.info("Enter Confirm Password Same as New Password");
    }
    this.http.post("http://localhost:8082/admin/changePassword",{email:this.email,password:this.currentPassword,newPassword:this.newPassword},this.getHttpOptions()).subscribe(
      response=>{
        this.toast.success("You Successfully changed the password, Please Login Again");
        this.authService.logout();
      },
      error=>{
        this.toast.error("Enter your current password correctly");
      }
    )
  }
  ngOnInit(): void {
    this.fetchUserDetails()
  }
  constructor(private http:HttpClient,private route:Router,private authService:AuthService,private toast:ToastrService){}
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
  logout(){
    this.authService.logout();
  }
  goBack(){
    this.route.navigate([`${this.role.toLowerCase()}/dashboard`])
  }
}
