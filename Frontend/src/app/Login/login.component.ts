import { Component,OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth/auth.service';
import {Router} from '@angular/router';
import { WindowService } from '../window.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string  = '';
  password: string = '';
  error_message: string = '';

  constructor(private authService: AuthService, private router: Router,private windowService: WindowService,private toast:ToastrService) {}
  login(){
    this.authService.login(this.username,this.password).subscribe(
      {
        next: (data) =>{
          console.log(this.authService.getToken());
          this.authService.saveUserData(data.token, data.role);
          if(data.role !== "ADMIN"){
            this.toast.error("Only Admins can use this login!!!")
            this.router.navigate(["/"]);
          }
          this.toast.success("You have successfully Logged in!!");
          this.redirectUser(data.role);
        },
        error: (error) => {
          this.toast.error("Invalid Username or Password!!");
        }
      }
    )
  }
  loginWithGoogle() {
    this.authService.oauthLogin('google');
  }  
  ngOnInit(){
    this.authService.handleAuthCallback();
  }
  logout() {
    this.authService.logout();
  }
  redirectUser(role: string){
    if(role === 'USER'){
      this.router.navigate(['/user-dashboard']);
    }
    else if(role === 'ADMIN'){
      this.router.navigate(['/admin-dashboard']);
    }
    else if(role === 'CR'){
      this.router.navigate(['/cr-dashboard']);
  }
}
}
