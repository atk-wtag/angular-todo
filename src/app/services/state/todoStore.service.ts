import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStoreService {
  private readonly _todoSkeleton = {
    u_id: Date.now(),
    completed: false,
    createdAt: this.getCurrentDate(),
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
      description,
    });
    this._todos.next([newTodo, ...this.todos]);
    this._httpService.addTodo(newTodo).subscribe((y) => console.log(y));
  }

  removeTodo(value: Todo) {
    this._httpService.deleteTodo(value).subscribe();
    this.todos = this.todos.filter((todo) => todo !== value);
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

    this.todos.forEach((todo) => (todo === value ? completedTodo : null));
    this.todos = this.todos;
  }

  updateTodo(value: Todo, description: string): void {
    if (value.description === description) return;
    this._httpService
      .updateTodo({ u_id: value.u_id, description: description })
      .subscribe();
    this.todos.forEach((todo) =>
      todo === value ? (todo.description = description) : null
    );
    this.todos = this.todos;
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
}
