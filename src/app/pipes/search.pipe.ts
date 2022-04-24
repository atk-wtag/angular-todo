import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args: string): any {
    if (!value) return null;
    if (!args || args.length < 3) return value;

    return value.filter((data: Todo) =>
      data.description.toLowerCase().includes(args.toLowerCase())
    );
  }
}
