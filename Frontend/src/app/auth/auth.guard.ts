import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // ✅ Ensure `localStorage` is only accessed in the browser
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const userRole = localStorage.getItem('role');

      // ✅ Ensure the expected role is matched
      const expectedRole = route.data['role'];
      if (expectedRole && userRole?.toLowerCase() !== expectedRole.toLowerCase()) {
        this.router.navigate(['/']); // Redirect if role mismatch
        return false;
      }

      return true;
    } catch (error) {
      console.error('Invalid token:', error);
      this.router.navigate(['/']);
      return false;
    }
  }
}
