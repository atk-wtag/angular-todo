import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStoreService {
  private readonly _todoSkeleton = {
    completed: false,
    completedAt: null,
  };

  public searchKeyword: string = '';
  private _todos = new BehaviorSubject<Todo[]>([]);
  readonly todos$: Observable<Todo[]> = this._todos;

  constructor(private _httpService: HttpService) {}

  set todos(value: Todo[]) {
    this._todos.next(value);
  }

  get todos(): Todo[] {
    return this._todos.getValue();
  }

  getAllTodos() {
    const allTodos = this._httpService.getAllDescending();
    allTodos.subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  addTodo(description: string): void {
    const newTodo = Object.assign(new Todo(), this._todoSkeleton, {
      u_id: Date.now(),
      description,
      createdAt: this.getCurrentDate(),
    });
    this._httpService.addTodo(newTodo).subscribe();
    setTimeout(() => {
      this._todos.next([newTodo, ...this.todos]);
    }, 300);
  }

  removeTodo(value: Todo) {
    this._httpService.deleteTodo(value).subscribe();
    const tempTodo = this.todos.filter((todo) => todo !== value);

    this.assignWithDelay(tempTodo);
  }

  setCompleted(value: Todo): void {
    const date = this.getCurrentDate();

    const completedTodo = Object.assign(value, {
      completed: true,
      completedAt: date,
    });

    this._httpService
      .updateTodo({ u_id: value.u_id, completed: true, completedAt: date })
      .subscribe();

    const tempTodos = this.todos.map((todo: Todo) =>
      todo === value ? completedTodo : todo
    );
    this.assignWithDelay(tempTodos);
  }

  updateTodo(value: Todo, description: string): void {
    if (value.description === description) return;

    const updatedTodo = Object.assign(value, {
      description: description,
    });

    this._httpService
      .updateTodo({ u_id: value.u_id, description: description })
      .subscribe();
    const tempTodos = this.todos.map((todo: Todo) =>
      todo === value ? updatedTodo : todo
    );
    this.assignWithDelay(tempTodos);
  }

  readonly completedTodos$ = this.filterTodos(this.todos$, true);

  readonly incompleteTodos$ = this.filterTodos(this.todos$, false);

  getCurrentDate() {
    return new Date(Date.now() + 1000 * 60 * -new Date().getTimezoneOffset())
      .toISOString()
      .replace('Z', '');
  }

  filterTodos(thisArg: Observable<Todo[]>, filter: boolean) {
    return thisArg.pipe(
      map((todos: any[]) => todos.filter((todo) => todo.completed === filter))
    );
  }

  assignWithDelay(value: Todo[]) {
    setTimeout(() => {
      this.todos = value;
    }, 300);
  }
}
