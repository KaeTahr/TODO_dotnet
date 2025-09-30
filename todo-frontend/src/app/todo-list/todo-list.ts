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
    if (this.newTitle.trim()) return;
    this.todoService.addTodo(this.newTitle).subscribe(() => {
      this.newTitle = '';
      this.loadTodos();
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}
