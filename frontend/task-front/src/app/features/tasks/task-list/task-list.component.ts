import { Component, OnInit, inject } from '@angular/core';

import { TaskService, Task } from '../../../core/services/task/task.service';
import { MessageService } from '../../../core/services/message/message.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  private msg = inject(MessageService);

  tasks: Task[] = [];
  editingTask: Task | null = null;
  showForm = false;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => this.tasks = res.data,
      error: () => this.msg.showError('Error al cargar tareas')
    });
  }

  toggleComplete(task: Task) {
    const newStatus = task.estado === 'pendiente' ? 'completada' : 'pendiente';
    this.taskService.updateTask(task.id, { estado: newStatus }).subscribe({
      next: () => this.loadTasks(),
      error: () => this.msg.showError('Error al actualizar estado')
    });
  }

  deleteTask(id: number) {
    if (confirm('¿Eliminar tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.msg.showSuccess('Tarea eliminada');
          this.loadTasks();
        },
        error: () => this.msg.showError('Error al eliminar')
      });
    }
  }

  editTask(task: Task) {
    this.editingTask = task;
    this.showForm = true;
  }

  onFormClose(refresh = false) {
    this.showForm = false;
    this.editingTask = null;
    if (refresh) this.loadTasks();
  }
}
