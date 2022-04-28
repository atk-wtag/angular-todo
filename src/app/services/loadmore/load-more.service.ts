import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadMoreService {
  public showLoadMore = new BehaviorSubject<boolean>(false);
  public showLoadLess = new BehaviorSubject<boolean>(false);

  private _showFrom = new BehaviorSubject<number>(0);
  private _showTill = new BehaviorSubject<number>(12);

  private readonly maxIncrement: number = 12;

  public max = new BehaviorSubject<number>(12);

  showFrom$: Observable<number> = this._showFrom;
  showTill$: Observable<number> = this._showTill;

  constructor() {
    this.max.subscribe((value) => {
      this.showTill$.subscribe(() => {
        value <= this.showTill
          ? this.showLoadMore.next(false)
          : this.showLoadMore.next(true);
      });
    });
  }

  get showFrom(): number {
    return this._showFrom.value;
  }

  set showTill(value: number) {
    this._showTill.next(value);
  }

  get showTill(): number {
    return this._showTill.value;
  }

  get maxValue() {
    return this.max.value;
  }

  loadMore() {
    this.showTill + this.maxIncrement > this.maxValue
      ? (this.showTill = this.maxValue)
      : (this.showTill += this.maxIncrement);
  }

  showLess() {
    this.showTill - this.maxIncrement < this.maxIncrement
      ? (this.showTill = this.maxIncrement)
      : (this.showTill -= this.maxIncrement);
  }

  reset() {
    this._showFrom.next(0);
    this._showTill.next(12);
  }
}
