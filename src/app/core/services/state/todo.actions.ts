import { Action, createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';

export const FETCH_ALL_TODOS = '[Todo] Fetch All Todos';
export const FETCH_ALL_TODOS_SUCCESS = '[Todo] Fetch All Todos Success';
export const DELETE_TODO = '[Todo] Delete Todo';
export const DELETE_TODO_SUCCESS = '[Todo] Delete Todo Success';
export const ADD_TODO = '[Todo] Add Todo';
export const ADD_TODO_SUCCESS = '[Todo] Add Todo Success';
export const UPDATE_TODO = '[Todo] Update Todo';
export const UPDATE_TODO_SUCCESS = '[Todo] Update Todo Success';

export class GetAllTodo implements Action {
  readonly type = FETCH_ALL_TODOS;
}
export const fetchSuccess = createAction(
  FETCH_ALL_TODOS_SUCCESS,
  props<{ todos: Todo[] }>()
);

export const deleteTodo = createAction(DELETE_TODO, props<{ todo: Todo }>());
export const deleteSuccess = createAction(
  DELETE_TODO_SUCCESS,
  props<{ todo: Todo }>()
);

export const addTodo = createAction(ADD_TODO, props<{ todo: Todo }>());
export const addTodoSuccess = createAction(
  ADD_TODO_SUCCESS,
  props<{ todo: Todo }>()
);

export const updateTodo = createAction(UPDATE_TODO, props<{ todo: Todo }>());
export const updateTodoSuccess = createAction(
  UPDATE_TODO_SUCCESS,
  props<{ todo: Todo }>()
);
