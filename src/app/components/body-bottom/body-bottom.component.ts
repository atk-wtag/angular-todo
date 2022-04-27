import { Component } from '@angular/core';
import { BodySpinnerService } from 'src/app/services/bodySpinner/body-spinner.service';
import { LoadMoreService } from '../../services/loadmore/load-more.service';

@Component({
  selector: 'app-body-bottom',
  templateUrl: './body-bottom.component.html',
  styleUrls: ['./body-bottom.component.css'],
})
export class BodyBottomComponent {
  showMore: boolean;
  allCount: number;
  completedCount: number;
  incompleteCount: number;

  constructor(
    public loadMoreService: LoadMoreService,
    private _bodySpinnerService: BodySpinnerService
  ) {
    this.loadMoreService.showLoadMore.subscribe((value) => {
      this.showMore = value;
    });
  }

  loadMore() {
    this._bodySpinnerService.toggleSpinner();
    document.getElementById('mainBody')?.classList.add('disable');
    setTimeout(() => {
      this._bodySpinnerService.toggleSpinner();
      document.getElementById('mainBody')?.classList.remove('disable');

      this.loadMoreService.loadMore();
    }, 300);
  }
}
