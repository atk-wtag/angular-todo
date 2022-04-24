import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddNewService {
  private _newTask = new BehaviorSubject<boolean>(false);
  newTaskVisible$: Observable<boolean> = this._newTask;

  constructor() {}

  get newTask(): boolean {
    return this._newTask.value;
  }

  set newTask(value: boolean) {
    this._newTask.next(value);
  }
}
