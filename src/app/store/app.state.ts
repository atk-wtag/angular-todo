import { todoReducer } from '../core/services/state/todo.reducer';
import { TodoState } from '../core/services/state/todo.state';

export interface AppState {
  todo: TodoState;
}

export const appReducer = {
  todo: todoReducer,
};
