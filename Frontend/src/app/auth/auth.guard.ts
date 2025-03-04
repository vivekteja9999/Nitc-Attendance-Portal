import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(): boolean{
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
}
}