import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, TodoItem } from '../todo'
import { CreateTodo } from '../create-todo/create-todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CreateTodo],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList implements OnInit {
  todos: TodoItem[] = [];
  newTitle: string = '';
  users = ['Alice', 'Bob', 'Katherine']; //hardcoded authors for demonstration
  selected: TodoItem | null = null;
  
  constructor(private todo: Todo) {}

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
    this.selected = structuredClone(t);
    this.detailDialog.nativeElement.showModal();
  }

  close() {
    this.selected = null;
    this.detailDialog.nativeElement.close();
  }

  save() {
    if (!this.selected) return;
    this.todo.update(this.selected).subscribe(() => this.loadTodos());
    this.close();
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
}
