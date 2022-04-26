// import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddNewService } from 'src/app/services/addnew/addNew.service';
import { TodoStoreService } from 'src/app/services/state/todoStore.service';
import { LoadMoreService } from '../../services/loadmore/load-more.service';

@Component({
  selector: 'app-body-mid',
  templateUrl: './body-mid.component.html',
  styleUrls: ['./body-mid.component.css'],
  // animations: [
  //   trigger('fade', [
  //     transition('void => active', [
  //       style({ opacity: 0 }),
  //       animate(500, style({ opacity: 1 })),
  //     ]),
  //     transition('* => void', [
  //       animate(500, style({ opacity: 0, visibility: 'hidden' })),
  //     ]),
  //   ]),
  // ],
})
export class BodyMidComponent implements OnInit {
  newTaskVisible: boolean;
  todosToRender: any;
  currentRoute: string;
  todosToShow: any;
  from: number;
  to: number;

  @ViewChild('todoItem') todoItem: ElementRef;

  constructor(
    public state: TodoStoreService,
    private _router: Router,
    private _addNewService: AddNewService,
    public loadMoreService: LoadMoreService
  ) {
    this._addNewService.newTask = false;
    this.loadMoreService.reset();
    this.currentRoute = this._router.url;
    this.loadMoreService.showFrom$.subscribe((from) => (this.from = from));
    this.loadMoreService.showTill$.subscribe((to) => (this.to = to));
    this._addNewService.newTaskVisible$.subscribe((value) => {
      this.newTaskVisible = value;
    });
  }
  ngOnInit() {
    if (this.currentRoute === '/all') this.todosToRender = this.state.todos$;
    else if (this.currentRoute === '/incomplete')
      this.todosToRender = this.state.incompleteTodos$;
    else this.todosToRender = this.state.completedTodos$;
  }
}
