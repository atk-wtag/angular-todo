import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadMoreService {
  public showLoadMore = new BehaviorSubject<boolean>(false);
  private _showFrom = new BehaviorSubject<number>(0);
  private _showTill = new BehaviorSubject<number>(12);

  // showLoadMore$: Observable<boolean> = this._showLoadMore;
  showFrom$: Observable<number> = this._showFrom;
  showTill$: Observable<number> = this._showTill;

  constructor() {}

  get showFrom(): number {
    return this._showFrom.value;
  }

  loadMore() {
    // this._showFrom.next(this._showFrom.value + 12);
    this._showTill.next(this._showTill.value + 12);
  }

  reset() {
    this._showFrom.next(0);
    this._showTill.next(12);
  }
}
