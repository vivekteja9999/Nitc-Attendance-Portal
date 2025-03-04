import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string  = '';
  password: string = '';
  error_message: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  login(){
    this.authService.login(this.username,this.password).subscribe(
      {
        next: (data) =>{
          this.authService.saveUserData(data.token, data.role);
          this.redirectUser(data.role);
        },
        error: (error) => {
          this.error_message = error.error.message;
        }
      }
    )
  }
  loginWithGoogle() {
    this.authService.oauthLogin('google');
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
