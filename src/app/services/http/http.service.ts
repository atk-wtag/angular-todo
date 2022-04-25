import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly _apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getAllDescending(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this._apiUrl}order=u_id.desc`);
  }

  deleteTodo(todo: Todo): Observable<any> {
    const u_id: number = todo.u_id;
    return this.httpClient.delete(`${this._apiUrl}u_id=eq.${u_id}`);
  }
}
