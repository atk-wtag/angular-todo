import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../../../models/todo.model';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _errorTimeout: number = 1500;
  private _successTimeout: number = 1000;

  private progressTimer: any;

  private readonly _apiUrl = environment.apiUrl;

  private _httpSucccess = new BehaviorSubject<boolean>(false);
  public progress = new BehaviorSubject<number>(0);
  private _httpError = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  get httpError(): boolean {
    return this._httpError.getValue();
  }

  set httpError(value: boolean) {
    this._httpError.next(value);
    setTimeout(() => {
      this._httpError.next(!value);
    }, this._errorTimeout);
  }

  get httpSuccess(): boolean {
    return this._httpSucccess.getValue();
  }

  set httpSuccess(value: boolean) {
    this._httpSucccess.next(value);
    setTimeout(() => {
      this._httpSucccess.next(!value);
    }, this._successTimeout);
  }

  getAllDescending(): Observable<Todo[]> {
    this.startProgressBar();
    const result = this.httpClient.get<Todo[]>(
      `${this._apiUrl}order=u_id.desc`
    );

    return result;
  }

  deleteTodo(todo: Todo): Observable<any> {
    const u_id: number = todo.u_id;
    return this.httpClient.delete(`${this._apiUrl}u_id=eq.${u_id}`);
  }

  addTodo(todo: Todo): Observable<any> {
    return this.httpClient.post(`${this._apiUrl}`, todo);
  }

  updateTodo(todo: any): Observable<any> {
    const u_id: number = todo.u_id;
    return this.httpClient.patch(`${this._apiUrl}u_id=eq.${u_id}`, todo);
  }

  startProgressBar() {
    const interval = 50;
    this.progressTimer = setInterval(() => {
      if (this.progress.value == 90) {
        this.stopProgressBar();
        return;
      }
      this.progress.next(this.progress.value + 1);
    }, interval);
  }

  stopProgressBar() {
    this.progressTimer ? clearInterval(this.progressTimer) : null;
  }
}
