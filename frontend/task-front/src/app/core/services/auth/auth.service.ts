import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}

interface User {
  id: number;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        try {
          this.currentUserSubject.next(JSON.parse(user));
        } catch {
          this.logout();
        }
      }
    }
  }

 login(email: string, password: string): Observable<LoginResponse> {     
  return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
    tap((res: LoginResponse) => {                                       
      if (res.success && this.isBrowser) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.currentUserSubject.next(res.data.user);
      }
    })
  );
}

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
