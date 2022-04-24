export class Todo {
  u_id: number;
  description: string;
  completed: boolean;
  createdAt: any;
  completedAt: any;
}

export class TodoOperation {
  deserialize(data: any): Todo {
    const todos = Object.assign(new Todo(), data);
    return todos;
  }
}
