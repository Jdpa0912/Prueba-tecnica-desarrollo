import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Task {
  id: number;
  titulo: string;
  descripcion?: string;
  estado: 'pendiente' | 'completada';
  prioridad: 'alta' | 'media' | 'baja';
  created_at: string;
  user_id: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<{ success: boolean; data: Task[] }> {
    return this.http.get<{ success: boolean; data: Task[] }>(`${this.apiUrl}/tasks`);
  }

  createTask(task: Partial<Task>): Observable<{ success: boolean; data: Task }> {
    return this.http.post<{ success: boolean; data: Task }>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(id: number, task: Partial<Task>): Observable<{ success: boolean; data: Task }> {
    return this.http.put<{ success: boolean; data: Task }>(`${this.apiUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/tasks/${id}`);
  }
}