import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../../core/services/task/task.service';
import { MessageService } from '../../../core/services/message/message.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<boolean>();

  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private msgService: MessageService
  ) {
    this.taskForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      descripcion: [''],
      prioridad: ['media', Validators.required],
      estado: ['pendiente']
    });
  }

  ngOnInit() {
    if (this.task) {
      this.taskForm.patchValue({
        titulo: this.task.titulo,
        descripcion: this.task.descripcion,
        prioridad: this.task.prioridad,
        estado: this.task.estado
      });
    }
  }

  onSubmit() {
    if (this.taskForm.invalid) return;
    const data = this.taskForm.value;
    if (this.task) {
      this.taskService.updateTask(this.task.id, data).subscribe({
        next: () => {
          this.msgService.showSuccess('Tarea actualizada');
          this.close.emit(true);
        },
        error: () => this.msgService.showError('Error al actualizar')
      });
    } else {
      this.taskService.createTask(data).subscribe({
        next: () => {
          this.msgService.showSuccess('Tarea creada');
          this.close.emit(true);
        },
        error: () => this.msgService.showError('Error al crear')
      });
    }
  }

  cancel() {
    this.close.emit(false);
  }
}
