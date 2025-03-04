import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private apiUrl = 'http://localhost:8080/api/auth/login';
  constructor(private http: HttpClient, private router: Router){}
  login(username: string, password: string){
    return this.http.post<{token:string,role:string}>(this.apiUrl, {username, password})
  }
  oauthLogin(provider:string){
    console.log('oauthLogin');
    window.location.href = `http://localhost:8082/oauth2/authorization/${provider}`;
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