import { Component, OnInit } from '@angular/core';
import { Todo } from './models/todo.model';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { TodoStoreService } from './services/state/todoStore.service';
import { LoadMoreService } from './services/loadmore/load-more.service';
import { HttpService } from './services/http/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'basicTodo';

  todos: any;

  constructor(
    private _state: TodoStoreService,
    private _loadMoreService: LoadMoreService
  ) {}

  ngOnInit() {
    this._state.getAllTodos();

    this._loadMoreService.showLoadMore.next(true);
  }
}
