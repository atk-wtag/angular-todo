import { Component } from '@angular/core';
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

  constructor(public loadMoreService: LoadMoreService) {
    this.loadMoreService.showLoadMore.subscribe((value) => {
      this.showMore = value;
    });
  }

  loadMore() {
    this.loadMoreService.loadMore();
  }
}
