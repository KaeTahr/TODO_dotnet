import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoList, MatToolbarModule, MatIconModule],
  template: `
  <mat-toolbar color="primary" class="app-header">
    <mat-icon class="logo">checklist</mat-icon>
    <span class="title">My Todo App</span>
    <span class="spacer"></span>
    <button mat-icon-button aria-label="Account">
      <mat-icon>account_circle</mat-icon>
    </button>
  </mat-toolbar>
  <app-todo-list></app-todo-list>`,
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('todo-frontend');
}
