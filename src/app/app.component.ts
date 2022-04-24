import { Component, OnInit } from '@angular/core';
import { TodoOperation } from './models/todo.model';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { TodoStoreService } from './services/state/todoStore.service';
import { LoadMoreService } from './services/loadmore/load-more.service';
import {HttpService} from "./services/http/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'basicTodo';

  todos: any;

  constructor(
    private readonly _supabase: SupabaseService,
    private _state: TodoStoreService,
    private _loadMoreService: LoadMoreService,
    private _httpService:HttpService
  ) {}

  async ngOnInit() {
    const x = this._httpService.getAllTodos();
    const todos = await this._supabase.allTodos;
    this.todos = todos.data?.map((todo) =>
      new TodoOperation().deserialize(todo)
    );
    this._state.todos = this.todos;
    this._loadMoreService.showLoadMore.next(true);
    console.log(x.subscribe(y => console.log(y)))
  }
}
