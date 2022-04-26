import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoStoreService } from '../state/todoStore.service';

@Injectable({
  providedIn: 'root',
})
export class LoadMoreService {
  public showLoadMore = new BehaviorSubject<boolean>(false);
  private _showFrom = new BehaviorSubject<number>(0);
  private _showTill = new BehaviorSubject<number>(12);

  showFrom$: Observable<number> = this._showFrom;
  showTill$: Observable<number> = this._showTill;

  constructor(private _state: TodoStoreService) {}

  get showFrom(): number {
    return this._showFrom.value;
  }

  set showTill(value: number) {
    this._showTill.next(value);
  }

  get showTill(): number {
    return this._showTill.value;
  }

  loadMore() {
    this._showTill.next(this._showTill.value + 12);
  }

  reset() {
    this._showFrom.next(0);
    this._showTill.next(12);
  }
}
