import { Component, OnInit } from '@angular/core';
import { LoadMoreService } from './services/loadmore/load-more.service';
import { TodoStoreService } from './services/state/todoStore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Todo App';
  showSplash: boolean = true;
  todos: any;

  constructor(
    private _state: TodoStoreService,
    private _loadMoreService: LoadMoreService
  ) {}

  ngOnInit() {
    this._state.getAllTodos();

    this._loadMoreService.showLoadMore.next(true);

    setTimeout(() => {
      this.showSplash = !this.showSplash;
    }, 1500);
  }
}
