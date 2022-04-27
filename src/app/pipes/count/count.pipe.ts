import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Todo } from 'src/app/models/todo.model';
import { NoTodosService } from 'src/app/services/NoTodos/no-todos.service';
import { LoadMoreService } from '../../services/loadmore/load-more.service';
import { TodoStoreService } from '../../services/state/todoStore.service';

@Pipe({
  name: 'count',
})
export class CountPipe implements PipeTransform, OnDestroy {
  private _showLoadLess: boolean;
  private _showTillSubscription: Subscription;

  constructor(
    private _loadMoreService: LoadMoreService,
    private _noTodosService: NoTodosService,
    private _state: TodoStoreService
  ) {}

  transform(value: Todo[]): Todo[] {
    const length = value.length;

    length === 0
      ? this._noTodosService.noTodos.next(true)
      : this._noTodosService.noTodos.next(false);

    this._loadMoreService.max.next(length);

    this._showTillSubscription = this._loadMoreService.showTill$.subscribe(
      (to) => {
        if (to >= length && to > 12 && length > 12) {
          this._loadMoreService.showLoadLess.next(true);
        } else {
          this._loadMoreService.showLoadLess.next(false);
        }
      }
    );
    return value;
  }

  ngOnDestroy(): void {
    if (this._showTillSubscription) this._showTillSubscription.unsubscribe();
  }
}
