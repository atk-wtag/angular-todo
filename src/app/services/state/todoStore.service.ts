import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';

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

  constructor() {}

  set todos(value: Todo[]) {
    this._todos.next(value);
  }

  get todos(): Todo[] {
    return this._todos.getValue();
  }

  addTodo(description: string): void {
    this._todos.next([
      Object.assign(new Todo(), this._todoSkeleton, { description }),
      ...this.todos,
    ]);
  }

  removeTodo(value: Todo): void {
    this.todos = this.todos.filter((todo) => todo !== value);
  }

  setCompleted(value: Todo): void {
    const date = this.getCurrentDate();

    this.todos.forEach((todo) =>
      todo === value
        ? Object.assign(todo, { completed: true, completedAt: date })
        : null
    );
    this.todos = this.todos;
  }

  updateTodo(value: Todo, description: string): void {
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
