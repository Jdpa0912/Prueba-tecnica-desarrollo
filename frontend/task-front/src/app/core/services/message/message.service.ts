import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Message {
  type: 'success' | 'error';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSubject = new Subject<{ type: string; text: string } | null>();
  message$ = this.messageSubject.asObservable();

  showSuccess(text: string) {
    this.messageSubject.next({ type: 'success', text });
    setTimeout(() => this.clear(), 3000);
  }

  showError(text: string) {
    this.messageSubject.next({ type: 'error', text });
    setTimeout(() => this.clear(), 5000);
  }

  clear() {
    this.messageSubject.next(null);
  }
}