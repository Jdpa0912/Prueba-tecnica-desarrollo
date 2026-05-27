import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformServer } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  canActivate(): boolean | UrlTree {
    if (isPlatformServer(this.platformId)) {
      return true;
    }

    return this.authService.isAuthenticated()
      ? true
      : this.router.createUrlTree(['/login']);
  }
}
