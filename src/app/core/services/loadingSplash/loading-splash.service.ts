import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingSplashService {
  public isLoading = new BehaviorSubject<boolean>(true);

  constructor() {}
}
