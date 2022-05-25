export class Todo {
  u_id: number;
  description: string;
  completed: boolean;
  createdAt: String;
  completedAt?: String;

  constructor(todo: any) {
    this.u_id = todo.u_id;
    this.description = todo.description;
    this.completed = todo.completed;
    this.createdAt = todo.createdAt;
    this.completedAt = todo.completedAt;
  }
}

export class TodoOperation {
  static deserialize(data: any): Todo {
    const todos = new Todo(data);
    return todos;
  }
}
