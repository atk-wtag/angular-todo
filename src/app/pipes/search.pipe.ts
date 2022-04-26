import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';
import { LoadMoreService } from '../services/loadmore/load-more.service';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  constructor(private _loadMoreService: LoadMoreService) {}

  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args || args.length < 3) {
      this._loadMoreService.reset();
      return value;
    }

    return value.filter((data: Todo) =>
      data.description.toLowerCase().includes(args.toLowerCase())
    );
  }
}
