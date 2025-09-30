import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, TodoItem } from '../todo'
import { CreateTodo } from '../create-todo/create-todo';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
 import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TodoDetailDialog } from '../todo-detail-dialog/todo-detail-dialog';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CreateTodo, MatCardModule,
     MatButtonModule, MatIconModule, MatChipsModule, MatFormFieldModule,
     MatSelectModule, MatOptionModule, MatDialogModule, TodoDetailDialog],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList implements OnInit {
  todos: TodoItem[] = [];
  newTitle: string = '';
  users = ['Alice', 'Bob', 'Katherine']; //hardcoded authors for demonstration
  selected: TodoItem | null = null;
  
  constructor(private todo: Todo, private dialog: MatDialog) {}

  ngOnInit(): void {
      this.loadTodos();
  }

  loadTodos(): void {
    this.todo.getTodos().subscribe(data => {
      console.log('GET /todos ->', data);
       this.todos = data;
    });
  }

  deleteTodo(id: number): void {
    this.todo.deleteTodo(id).subscribe(() => this.loadTodos());
  }

  @ViewChild('detailDialog') detailDialog!: ElementRef<HTMLDialogElement>;

   open(t: TodoItem) {
    // pass a shallow copy so dialog edits don't mutate the list until save
    const ref = this.dialog.open(TodoDetailDialog, {
      width: '640px',
      maxWidth: '95vw',
      autoFocus: false,
      data: { ...t }
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return; // cancelled
      this.todo.update(result).subscribe(() => this.loadTodos());
    });
  }

  markDone(t: TodoItem) {
    const copy = {...t, status: 'Done' as const};
    this.todo.update(copy).subscribe(() => this.loadTodos());
  }

  confirmDelete(t: TodoItem) {
    if (!confirm(`Delete "${t.title}"?`)) return; 

    this.todo.deleteTodo(t.id).subscribe(() => this.loadTodos());
  }

  handleCreated(t: TodoItem) {
    this.loadTodos();
  }

  openCreate() {
    (document.querySelector('#createDialog') as HTMLDialogElement).showModal();
  }

  trackById(index: number, item: TodoItem): number {
  return item.id;
}
}
