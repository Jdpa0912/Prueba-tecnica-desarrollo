import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);


  canActivate(): boolean | UrlTree {
    if (isPlatformServer(this.platformId)) {
      return true;
    }

    return this.authService.isAuthenticated()
      ? true
      : this.router.createUrlTree(['/login']);
  }
}
