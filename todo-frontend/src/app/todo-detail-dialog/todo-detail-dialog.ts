import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TodoItem, TodoStatus } from '../todo';

@Component({
  standalone: true,
  selector: 'app-todo-detail-dialog',
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatOptionModule, MatButtonModule
  ],
  templateUrl: './todo-detail-dialog.html'
})
export class TodoDetailDialog {
  users = ['Alice', 'Bob', 'Katherine'];

  // We mutate a copy held in dialog data; parent decides to persist on close
  constructor(
    public ref: MatDialogRef<TodoDetailDialog, TodoItem | undefined>,
    @Inject(MAT_DIALOG_DATA) public data: TodoItem
  ) {}

  save()  { this.ref.close(this.data); }
  cancel(){ this.ref.close(undefined); }
}