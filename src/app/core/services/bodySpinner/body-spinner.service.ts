import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class BodySpinnerService {
  public spinner = new BehaviorSubject<boolean>(false);
  constructor() {}

  toggleSpinner() {
    this.spinner.next(!this.spinner.value);
  }
}
