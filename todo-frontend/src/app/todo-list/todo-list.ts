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
  users = ['Alice', 'Bob', 'Katherine']; //hardcoded authors for demonstration
  selected: TodoItem | null = null;
  newComment = '';
  
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
      this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(data => {
      console.log('GET /todos ->', data);
       this.todos = data;
    });
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

  open(t: TodoItem) {
    this.selected = structuredClone(t);
    (document.querySelector('dialog') as HTMLDialogElement).showModal();
  }

  close() {
    (document.querySelector('dialog') as HTMLDialogElement).close();
    this.selected = null;
  }

  save() {
    if (!this.selected) return;
    this.todoService.update(this.selected).subscribe(() => this.loadTodos());
    this.close();
  }

  markDone(t: TodoItem) {
    const copy = {...t, status: 'Done' as const};
    this.todoService.update(copy).subscribe(() => this.loadTodos());
  }

  confirmDelete(t: TodoItem) {
    if (!confirm(`Delete "${t.title}"?`)) return; 

    this.todoService.deleteTodo(t.id).subscribe(() => this.loadTodos());
  }

  addComment() {
    if (!this.selected || !this.newComment.trim()) return;
    this.todoService.addComment(this.selected.id, {author: 'Katherine', text: this.newComment.trim() })
      .subscribe(()=> {this.newComment = ''; this.loadTodos(); });
  }
}
