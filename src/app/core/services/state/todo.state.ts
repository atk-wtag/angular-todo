import { Todo } from 'src/app/models/todo.model';

export interface TodoState {
  todos: Todo[];
  completedTodos: Todo[];
  incompleteTodos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
  completedTodos: [],
  incompleteTodos: [],
};
