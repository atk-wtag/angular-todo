import { Component, OnInit } from '@angular/core';
import { LoadMoreService } from '../../services/loadmore/load-more.service';

@Component({
  selector: 'app-body-bottom',
  templateUrl: './body-bottom.component.html',
  styleUrls: ['./body-bottom.component.css'],
})
export class BodyBottomComponent implements OnInit {
  noTodos: boolean = false;
  constructor(public loadMoreService: LoadMoreService) {
    this.loadMoreService.showLoadMore.subscribe((value) => {
      this.noTodos = value;
    });
  }

  ngOnInit(): void {}

  loadMore() {
    this.loadMoreService.loadMore();
  }
}
