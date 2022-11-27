import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Todo } from '../models'

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    baseUrl: string = 'https://6383058d1ada9475c8f69427.mockapi.io'
    headers = new HttpHeaders().set('Content-Type', 'application/json')

    constructor(private http: HttpClient) {}

    getAllTodo(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.baseUrl}/todos`, { headers: this.headers })
    }

    getTodo(id: string): Observable<Todo> {
        return this.http.get<Todo>(`${this.baseUrl}/todos/${id}`, {
            headers: this.headers,
        })
    }

    createTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(`${this.baseUrl}/todos`, todo, {
            headers: this.headers,
        })
    }

    updateTodo(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.baseUrl}/todos/${todo.id}`, todo, {
            headers: this.headers,
        })
    }

    deleteTodo(id: string | number): Observable<Todo> {
        return this.http.delete<Todo>(`${this.baseUrl}/todos/${id}`, {
            headers: this.headers,
        })
    }
}
