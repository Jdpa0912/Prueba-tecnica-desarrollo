import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth/auth.service';
import { MessageService } from './core/services/message/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  message: { type: string; text: string } | null = null;
  private sub: Subscription;

  constructor(
    public auth: AuthService,
    private msgService: MessageService,
    private router: Router
  ) {
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
