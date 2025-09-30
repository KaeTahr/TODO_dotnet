import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, TodoItem } from '../todo'

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList implements OnInit {
  todos: TodoItem[] = [];
  newTitle: string = '';
  
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
      this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(data => this.todos = data);
  }

  addTodo(): void {
    const title = this.newTitle.trim();
    if (!title) return;

    this.todoService.addTodo(title).subscribe({
      next: () => {
        this.newTitle = '';
        this.loadTodos();
      },
      error: (err) => console.error('POST failed:', err)
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}
