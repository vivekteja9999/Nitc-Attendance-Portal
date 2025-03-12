import {Injectable,Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { WindowService } from '../window.service';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {PLATFORM_ID} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private loginApiUrl = 'http://localhost:8082/auth/authenticate';
  private userUrl = 'http://localhost:8082/user/details';
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token'); // ✅ Only access localStorage in the browser
    }
    return null;
  }
  constructor(private http: HttpClient, private router: Router,private windowService:WindowService,@Inject(PLATFORM_ID) private platformId: Object,private toast:ToastrService){}
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginApiUrl, { email, password }).pipe(
      tap((response: any) => {
        if (response.token && response.role) {
          this.saveUserData(response.token, response.role);
        }
      }),
      catchError(error => {
        console.error('Error logging in', error);
        throw error;
      }
    ));
  }
  oauthLogin(provider:string){
    const window = this.windowService.nativeWindow;
    if (window) {
      window.location.href = "http://localhost:8082/oauth2/authorization/" + provider;
    }
  }
  handleAuthCallback() {
    const window = this.windowService.nativeWindow;
    if (window) {
      const token = this.getTokenFromUrl(window);
      const role = this.getRoleFromUrl(window);
      if (token && role) {
        this.saveUserData(token, role);
        this.toast.success("Successfully Logged in!!");
      // Redirect based on role
      if (role.toLowerCase() === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      }else if(role.toLowerCase() === "cr"){
        this.router.navigate(['/cr-dashboard'])
      }else {
        this.router.navigate(['/user-dashboard']);
      }
      }
    }
  }  
  getTokenFromUrl(window: Window): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  }
  getRoleFromUrl(window: Window): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('role');
  }
  getUserDetails(): Observable<any> {
    const token = this.getToken();
    if (!token || token.includes('@')) { // ✅ Ensure it's not an email
      console.error("Invalid token detected:", token);
      return throwError(() => new Error("Invalid token"));
    }
    if (!token) {
      return throwError(() => new Error("No token found"));
    }
  
    // ✅ Send token in `Authorization` header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log("Bearer "+token);
    return this.http.get(this.userUrl, { headers }).pipe(
      catchError((error) => {
        console.error("API Error:", error);
        return throwError(() => new Error(error.status === 401 ? "Unauthorized. Please log in again." : "Error fetching user details"));
      })
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error("API Error:", error);
    return throwError(() => new Error(error.status === 401 ? "Unauthorized. Please log in again." : "Error fetching user details"));
  }
  saveUserData(token: string, role: string){
    localStorage.setItem('token', token); 
    localStorage.setItem('role', role);   
  }
  getRole(): string | null{
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role'); // ✅ Only access localStorage in the browser
    }
    return "";
  }
  logout() {
    this.toast.success("You have been Logged out!!")
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
}