import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from '../../models/todo.model';
import {LoadMoreService} from '../services/loadmore/load-more.service';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  currentLength: number;
  previousLength: number;

  constructor(private _loadMoreService: LoadMoreService) {
  }

  transform(value: any, args: string): any {
    this.currentLength = args.length;

    if (!value) return null;
    if (args.length < 3) {
      if (this.previousLength >= 3) {
        this._loadMoreService.reset();
        this.previousLength = 0;
      }
      return value;
    } else this.previousLength = this.currentLength;
    return value.filter((data: Todo) =>
      data.description.toLowerCase().includes(args.toLowerCase())
    );
  }
}
