import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth/auth.service';
import {Router} from '@angular/router';
import { WindowService } from '../window.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-page',
  imports: [NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  username: string  = '';
    password: string = '';
    error_message: string = '';
  
    constructor(private authService: AuthService, private router: Router,private windowService: WindowService,private toast:ToastrService,private route:ActivatedRoute) {}
    login(){
      this.authService.login(this.username,this.password).subscribe(
        {
          next: (data) =>{
            console.log(this.authService.getToken());
            this.authService.saveUserData(data.token, data.role,this.username);
            if(data.role !== "ADMIN"){
              this.toast.error("Only Admins can use this login!!!")
              this.router.navigate(["/"]);
            }
            this.toast.success("You have successfully Logged in!!");
            this.redirectUser(data.role);
          },
          error: (error) => {
            this.toast.error("Unable to login");
          }
        }
      )
    }
    loginWithGoogle() {
      this.authService.oauthLogin('google');
    }  
    ngOnInit(){
      this.authService.handleAuthCallback();
      this.route.queryParams.subscribe(params => {
        this.error_message = params['error'] || '';
        if(this.error_message!==""){
          this.toast.error("Use Nitc Mail Id!!","",{timeOut:3000});
          this.toast.clear();
          this.error_message="";
          this.router.navigate(["/"])
        }
      });
    }
    logout() {
      this.authService.logout();
    }
    redirectUser(role: string){
      if(role === 'USER'){
        this.router.navigate(['/user/dashboard']);
      }
      else if(role === 'ADMIN'){
        this.router.navigate(['/admin/dashboard']);
      }
      else if(role === 'CR'){
        this.router.navigate(['/cr/dashboard']);
    }
  }

  admin_login() {
    this.router.navigate(['admin_login']);
  }


  
}
