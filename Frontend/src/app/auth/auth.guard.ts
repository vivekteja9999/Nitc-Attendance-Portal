import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
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
    const userRole = localStorage.getItem('role');

    if (!token || !userRole) {
      this.router.navigate(['/']); // Redirect to home if no token
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const expectedRole = route.data['role'];

      // ✅ Restrict user from accessing admin routes
      if (state.url.startsWith('/admin') && userRole.toLowerCase() !== 'admin') {
        this.router.navigate(['/']); // Redirect non-admins from admin routes
        return false;
      }

      // ✅ Ensure user role matches expected role (if specified in route)
      if (expectedRole && userRole.toLowerCase() !== expectedRole.toLowerCase()) {
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
