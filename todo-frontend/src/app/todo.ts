import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type TodoStatus = 'Todo'|'InProgress'|'Done';
export interface TodoItem {
  id: number; title: string; description: string;
  author: string; assignedTo: string; status: TodoStatus;
}

@Injectable({
  providedIn: 'root'
})
export class Todo {
  private apiUrl = 'http://localhost:5293/api/todo'; 

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }
  
  addTodo(newTodo: Partial<TodoItem>): Observable<TodoItem> {
    console.log('Adding todo:', newTodo);
    return this.http.post<TodoItem>(this.apiUrl, newTodo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(todo: TodoItem) {
     return this.http.put<TodoItem>(`${this.apiUrl}/${todo.id}`, todo); 
  }
}


