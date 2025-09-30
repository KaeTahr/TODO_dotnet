import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, TodoItem } from '../todo';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule,
     MatInputModule, MatSelectModule, MatOptionModule],
  templateUrl: './create-todo.html',
  styleUrl: './create-todo.scss'
})
export class CreateTodo {
  @Output() created = new EventEmitter<TodoItem>();

  title = '';
  description = '';
  assignedTo = '';
  status: 'Todo' | 'InProgress' | 'Done' = 'Todo';
  users = ['Alice', 'Bob', 'Katherine'];

  constructor(private todo: Todo) {}

  submit() {
    const title = this.title.trim();
    if (!title) return;

      const newTodo: Partial<TodoItem> = {
        title: this.title,
        description: this.description,
        assignedTo: this.assignedTo,
        status: this.status,
        author: 'Katherine', //harcoded for demo
    };

    this.todo.addTodo(newTodo).subscribe({
      next: (created) => {
        this.created.emit(created);
        this.reset();
        this.closeDialog();
      },
      error: (err) => console.error('POST failed:', err)
    });
  }

  reset() {
    this.title = '';
    this.description = '';
    this.assignedTo = '';
    this.status = 'Todo';
  
  }

  closeDialog() {
    this.reset();
    (document.querySelector('#createDialog') as HTMLDialogElement)?.close();
  }
}


