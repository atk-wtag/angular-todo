import { createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';
import {
  addTodoSuccess,
  deleteSuccess,
  fetchSuccess,
  updateTodoSuccess,
} from './todo.actions';
import { initialState } from './todo.state';

export const todoReducer = createReducer(
  initialState,
  on(fetchSuccess, (state, action) => {
    return returnFn(state, action.todos);
  }),
  on(deleteSuccess, (state, action) => {
    const todoStateAfterRemoval = state.todos.filter(
      (todo: Todo) => todo.u_id !== action.todo.u_id
    );
    return returnFn(state, todoStateAfterRemoval);
  }),
  on(addTodoSuccess, (state, action) => {
    const newTodoState = [action.todo, ...state.todos];
    return returnFn(state, newTodoState);
  }),
  on(updateTodoSuccess, (state, action) => {
    const updatedTodoState = updateTodo(state.todos, action.todo);
    return returnFn(state, updatedTodoState);
  })
);

const filterTodos = (todos: Todo[]): any => {
  let completedTodos: Todo[] = [];
  let incompleteTodos: Todo[] = [];

  todos.forEach((todo: Todo) => {
    todo.completed ? completedTodos.push(todo) : incompleteTodos.push(todo);
  });
  return { completedTodos, incompleteTodos };
};

const updateTodo = (arr: any, todo: Todo): Todo[] => {
  const newArr: Todo[] = Array.from(arr);
  newArr.forEach((item: any) => {
    item.u_id === todo.u_id ? (newArr[newArr.indexOf(item)] = todo) : undefined;
  });
  return newArr;
};

function returnFn(state: any, todoObjectToSend: Todo[]) {
  const filteredObject = filterTodos(todoObjectToSend);
  return {
    ...state,
    todos: [...todoObjectToSend],
    completedTodos: [...filteredObject.completedTodos],
    incompleteTodos: [...filteredObject.incompleteTodos],
  };
}
