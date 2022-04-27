import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { NoTodosService } from 'src/app/services/NoTodos/no-todos.service';
import { LoadMoreService } from '../../services/loadmore/load-more.service';

@Pipe({
  name: 'count',
})
export class CountPipe implements PipeTransform {
  constructor(
    private _loadMoreService: LoadMoreService,
    private _noTodosService: NoTodosService
  ) {}
  transform(value: Todo[]): Todo[] {
    const length = value.length;

    length === 0
      ? this._noTodosService.noTodos.next(true)
      : this._noTodosService.noTodos.next(false);

    this._loadMoreService.max.next(length);

    return value;
  }
}
