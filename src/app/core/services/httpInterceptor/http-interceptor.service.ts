import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo, TodoOperation } from 'src/app/models/todo.model';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';
import { GetAllTodo } from '../state/todo.actions';
import { TodoStoreService } from '../state/todoController.service';

@Injectable()
export class HttpInterceptorService {
  constructor(
    private _state: TodoStoreService,
    private _httpService: HttpService,
    private _store: Store<{ todo: Todo[] }>
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
            .body.map((todo: Todo[]) => TodoOperation.deserialize(todo));
          setTimeout(() => {
            this._httpService.httpSuccess = true;
          }, environment.loadingDelay);

          return Object.assign(event, { body: todoEvent });
        }
        return event;
      }),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        this._httpService.httpError = true;
        if (requestWithHeader.method !== 'GET')
          this._store.dispatch(new GetAllTodo());
        else this._state.resetTodoSubject();

        return throwError(() => error);
      })
    );
  }
}
