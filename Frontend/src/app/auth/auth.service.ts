import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { WindowService } from '../window.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private apiUrl = 'http://localhost:8080/auth/login';
  constructor(private http: HttpClient, private router: Router,private windowService:WindowService){}
  login(username: string, password: string){
    return this.http.post<{token:string,role:string}>(this.apiUrl, {username, password})
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
      if (token) {
        localStorage.setItem('token', token);
        this.router.navigate(['/user-dashboard']);
      }
    }
  }  
  getTokenFromUrl(window: Window): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  }
  saveUserData(token: string, role: string){
    localStorage.setItem('token', token); 
    localStorage.setItem('role', role);   
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}