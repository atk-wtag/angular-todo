import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddNewService } from '../addnew/addNew.service';
import { HttpService } from '../http/http.service';
import { LoadingSplashService } from '../loadingSplash/loading-splash.service';
import {
  addTodoSuccess,
  ADD_TODO,
  deleteSuccess,
  DELETE_TODO,
  fetchSuccess,
  FETCH_ALL_TODOS,
  updateTodoSuccess,
  UPDATE_TODO,
} from './todo.actions';
import { TodoStoreService } from './todoController.service';

@Injectable()
export class TodoEffects {
  constructor(
    private _actions$: Actions,
    private _httpService: HttpService,
    private _loadingSplash: LoadingSplashService,
    private _store: Store,
    private _todoStore: TodoStoreService,
    private _newTaskService: AddNewService
  ) {}

  manageProgressBar(): void {
    console.log(4);

    const httpSubsctiption = this._httpService._httpSuccess.subscribe(
      (success: boolean) => {
        if (success) {
          this._httpService.stopProgressBar();
          this._httpService.progress.next(100);
          setTimeout(() => {
            this._loadingSplash.isLoading.next(false);
          }, environment.loadingDelay);
        }
      }
    );

    setTimeout(() => {
      httpSubsctiption.unsubscribe();
    }, environment.loadingDelay * 20);
  }

  getAllEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(FETCH_ALL_TODOS),
      mergeMap(() => {
        const httpResult = this._httpService.getAllDescending();
        this._todoStore.getAllTodos();
        this.manageProgressBar();
        return httpResult.pipe(map((data) => fetchSuccess({ todos: data })));
      })
    );
  });

  deleteTodoEffect$ = createEffect((): Observable<any> => {
    return this._actions$.pipe(
      ofType(DELETE_TODO),
      mergeMap((action: any): any => {
        const httpResponse = this._httpService.deleteTodo(action.todo);
        return httpResponse.pipe(
          map((data) => deleteSuccess({ todo: action.todo }))
        );
      })
    );
  });

  addTodoEffect$ = createEffect((): Observable<any> => {
    return this._actions$.pipe(
      ofType(ADD_TODO),
      mergeMap((action: any) => {
        const httpAdd = this._httpService.addTodo(action.todo);
        return httpAdd.pipe(
          tap(() => {
            this._newTaskService.newTask = false;
          }),
          map(() => addTodoSuccess({ todo: action.todo }))
        );
      })
    );
  });

  updateTodoEffect$ = createEffect((): Observable<any> => {
    return this._actions$.pipe(
      ofType(UPDATE_TODO),
      mergeMap((action: any) => {
        const httpUpdate = this._httpService.updateTodo(action.todo);
        return httpUpdate.pipe(
          map(() => updateTodoSuccess({ todo: action.todo }))
        );
      })
    );
  });
}
