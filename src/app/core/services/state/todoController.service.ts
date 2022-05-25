import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { HttpService } from '../http/http.service';
import { LoadingSplashService } from '../loadingSplash/loading-splash.service';
import { addTodo, deleteTodo, updateTodo } from './todo.actions';
import { getCompleted, getIncomplete, getTodos } from './todo.selectors';

@Injectable({
  providedIn: 'root',
})
export class TodoStoreService {
  private readonly _todoSkeleton = {
    completed: false,
    completedAt: undefined,
  };

  public searchKeyword: string = '';
  private _todos = new BehaviorSubject<Todo[]>([]);
  todos$: Observable<Todo[]>;
  completedTodos$: Observable<Todo[]>;
  incompleteTodos$: Observable<Todo[]>;

  constructor(
    private _httpService: HttpService,
    private _loadingSplash: LoadingSplashService,
    private _store: Store<{ todos: Todo[] }>
  ) {
    this.todos$ = this._store.select(getTodos);
    this.completedTodos$ = this._store.select(getCompleted);
    this.incompleteTodos$ = this._store.select(getIncomplete);
  }

  set todos(value: Todo[]) {
    this._todos.next(value);
  }

  get todos(): Todo[] {
    return this._todos.getValue();
  }

  addTodo(description: string): void {
    const newTodo = new Todo(
      Object.assign(this._todoSkeleton, {
        u_id: Date.now(),
        description,
        createdAt: TodoStoreService.getCurrentDate(),
      })
    );
    this._store.dispatch(addTodo({ todo: newTodo }));
  }

  removeTodo(value: Todo) {
    this._store.dispatch(deleteTodo({ todo: value }));
  }

  setCompleted(value: Todo): void {
    const date = TodoStoreService.getCurrentDate();

    const completedTodo = Object.assign(value, {
      completed: true,
      completedAt: date,
    });

    this._httpService.updateTodo(completedTodo).subscribe();

    const tempTodos = this.todos.map((todo: Todo) =>
      todo === value ? completedTodo : todo
    );

    this.assign(tempTodos);
  }

  updateTodo(value: Todo, description: string, completed: boolean): boolean {
    if (value.description === description && value.completed === completed)
      return false;

    const updatedTodo = new Todo(
      Object.assign(Object.assign({}, value), {
        description: description,
        completed: completed,
      })
    );

    this._store.dispatch(updateTodo({ todo: updatedTodo }));
    return true;
  }

  static getCurrentDate() {
    return new Date(Date.now() + 1000 * 60 * -new Date().getTimezoneOffset())
      .toISOString()
      .replace('Z', '');
  }

  filterTodos(thisArg: Observable<Todo[]>, filter: boolean) {
    return thisArg.pipe(
      map((todos: any[]) => todos.filter((todo) => todo.completed === filter))
    );
  }

  assign(value: Todo[]) {
    this.todos = value;
  }

  resetTodoSubject() {
    this._todos = new BehaviorSubject<Todo[]>([]);
  }
}
