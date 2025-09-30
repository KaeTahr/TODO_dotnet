import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type TodoStatus = 'Todo'|'InProgress'|'Done';
export interface Comment { author: string; text: string; createdAt?: string; }
export interface TodoItem {
  id: number; title: string; description: string;
  author: string; assignedTo: string; status: TodoStatus;
  timeSpent: number; comments: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5293/api/todo'; 

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }
  
  addTodo(title: string): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, { title, completed: false });
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(todo: TodoItem) {
     return this.http.put<TodoItem>(`${this.apiUrl}/${todo.id}`, todo); 
  }

  addComment(id: number, c: Comment) {
   return this.http.post(`${this.apiUrl}/${id}/comments`, c);
  }
}


