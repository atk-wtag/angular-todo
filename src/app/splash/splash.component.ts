import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpService } from '../core/services/http/http.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
})
export class SplashComponent implements OnDestroy {
  progressWidth: any;

  httpSubscription: Subscription;

  constructor(private httpService: HttpService) {
    this.httpSubscription = this.httpService.progress.subscribe(
      (value) => (this.progressWidth = value)
    );
  }

  ngOnDestroy(): void {
    this.httpSubscription.unsubscribe();
  }
}
