import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

const getTodoState = createFeatureSelector<TodoState>('todos');

const selector = (selectorFn: (state: any) => any) =>
  createSelector(getTodoState, selectorFn);

export const getTodos = selector((state: TodoState) => state.todos);

export const getCompleted = selector(
  (state: TodoState) => state.completedTodos
);
export const getIncomplete = selector(
  (state: TodoState) => state.incompleteTodos
);
