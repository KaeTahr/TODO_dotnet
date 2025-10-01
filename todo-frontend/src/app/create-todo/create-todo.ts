import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { Todo, TodoItem, TodoStatus } from '../todo';

export interface CreateTodoPayload {
  title: string;
  description?: string;
  assignedTo?: string;
  status?: TodoStatus;
  author?: string;
}

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatOptionModule, MatButtonModule
  ],
  templateUrl: './create-todo.html',
  styleUrl: './create-todo.scss'
})
export class CreateTodo {
  //demo 
  users = ['Alice', 'Bob', 'Katherine'];

  title = '';
  description = '';
  assignedTo = '';
  status: TodoStatus = 'Todo';
  author = 'Katherine'; //hardcoded for demo

  constructor(
    private api: Todo,
    public ref: MatDialogRef<CreateTodo, TodoItem | undefined>,
    @Inject(MAT_DIALOG_DATA) data: Partial<CreateTodoPayload> | null
  ) {
    if (data) {
      this.title       = data.title        ?? this.title;
      this.description = data.description  ?? this.description;
      this.assignedTo  = data.assignedTo   ?? this.assignedTo;
      this.status      = data.status       ?? this.status;
      this.author      = data.author       ?? this.author;
    }
  }

  get canSave(): boolean {
    return this.title.trim().length > 0;
  }

  save() {
    if (!this.canSave) return;

    const payload: CreateTodoPayload = {
      title: this.title.trim(),
      description: this.description || '',
      assignedTo: this.assignedTo || '',
      status: this.status,
      author: this.author || 'Unknown'
    };

    this.api.addTodo(payload).subscribe({
      next: (created) => this.ref.close(created),
      error: (err) => console.error('Create failed:', err)
    });
  }

  cancel() {
    this.ref.close(undefined);
  }
}