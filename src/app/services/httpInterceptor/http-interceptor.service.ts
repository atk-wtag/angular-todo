import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo, TodoOperation } from 'src/app/models/todo.model';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';
import { TodoStoreService } from '../state/todoStore.service';

@Injectable()
export class HttpInterceptorService {
  constructor(
    private _state: TodoStoreService,
    private _httpService: HttpService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = environment.supabaseKey;
    const headers = { apikey: token, Authorization: `Bearer ${token}` };
    const requestWithHeader = req.clone({
      setHeaders: headers,
    });

    return next.handle(requestWithHeader).pipe(
      map((event: HttpEvent<any>) => {
        if (
          event instanceof HttpResponse &&
          event.status === 200 &&
          event.body
        ) {
          let todoEvent = event
            .clone()
            .body.map((todo: Todo[]) => new TodoOperation().deserialize(todo));
          this._httpService.httpSuccess = true;
          return Object.assign(event, { body: todoEvent });
        }
        return event;
      }),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        this._httpService.httpError = true;
        if (requestWithHeader.method !== 'GET') this._state.getAllTodos();
        else this._state.resetTodoSubject();

        return throwError(() => error);
      })
    );
  }
}
