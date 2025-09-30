import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoList],
  template: `<app-todo-list></app-todo-list>`,
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('todo-frontend');
}
