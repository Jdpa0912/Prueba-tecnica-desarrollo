
import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { AuthService } from './core/services/auth/auth.service';
import { MessageService } from './core/services/message/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnDestroy {
  auth = inject(AuthService);
  private msgService = inject(MessageService);
  private router = inject(Router);

  message: { type: string; text: string } | null = null;
  private sub: Subscription;

  constructor() {
    this.sub = this.msgService.message$.subscribe(msg => (this.message = msg));
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
