import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoStoreService } from 'src/app/services/state/todoStore.service';
import { LoadMoreService } from '../../services/loadmore/load-more.service';

@Component({
  selector: 'app-body-bottom',
  templateUrl: './body-bottom.component.html',
  styleUrls: ['./body-bottom.component.css'],
})
export class BodyBottomComponent implements OnInit, AfterContentChecked {
  showMore: boolean;
  allCount: number;
  completedCount: number;
  incompleteCount: number;

  constructor(
    public loadMoreService: LoadMoreService,
    private _state: TodoStoreService,
    private _router: Router
  ) {
    this.loadMoreService.showLoadMore.subscribe((value) => {
      this.showMore = value;
    });
  }

  ngOnInit(): void {
    console.log(this._state.todos.length);

    this._state.incompleteTodos$.subscribe((todos) => {
      this.incompleteCount = todos.length;
    });
    // this._state.completedTodos$.subscribe((todos) => {
    //   this.completedCount = todos.length;
    // });
  }

  ngAfterContentChecked(): void {
    // switch (this._router.url) {
    //   case '/all':
    //     {
    //       if (this.allCount <= this.loadMoreService.showTill)
    //         console.log('asd');
    //     }
    //     break;
    //   case '/incomplete':
    //     {
    //       console.log(4);
    //     }
    //     break;
    //   case '/complete':
    //     {
    //       console.log(4);
    //     }
    //     break;
    //   default:
    //     break;
    // }
  }
  loadMore() {
    this.loadMoreService.loadMore();
  }
}
