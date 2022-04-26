import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { LoadMoreService } from '../../services/loadmore/load-more.service';

@Pipe({
  name: 'count',
})
export class CountPipe implements PipeTransform {
  constructor(private _loadMoreService: LoadMoreService) {}
  transform(value: Todo[]): Todo[] {
    this._loadMoreService.max.next(value.length);
    return value;
  }
}
