import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Todo, TodoOperation } from 'src/app/models/todo.model';
import { TodoStoreService } from '../state/todoStore.service';
import { HttpService } from '../http/http.service';

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

          return Object.assign(event, { body: todoEvent });
        }
        return event;
      }),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        this._httpService.httpError = true;
        if (requestWithHeader.method !== 'GET') {
          this._state.getAllTodos();
        }
        return throwError(() => error);
      })
    );
  }
}
