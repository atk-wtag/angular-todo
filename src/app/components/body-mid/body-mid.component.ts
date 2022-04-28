// import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AddNewService } from 'src/app/services/addnew/addNew.service';
import { TodoStoreService } from 'src/app/services/state/todoStore.service';
import { LoadMoreService } from '../../services/loadmore/load-more.service';

@Component({
  selector: 'app-body-mid',
  templateUrl: './body-mid.component.html',
  styleUrls: ['./body-mid.component.css'],
})
export class BodyMidComponent implements OnInit, OnDestroy {
  newTaskVisible: boolean;
  todosToRender: any;
  currentRoute: string;
  todosToShow: any;
  from: number;
  to: number;
  spinner: boolean = false;

  showFromSubscription: Subscription;
  showTillSubscription: Subscription;
  newTaskVisibleSubscrioption: Subscription;

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

    this.showFromSubscription = this.loadMoreService.showFrom$.subscribe(
      (from) => (this.from = from)
    );

    this.showTillSubscription = this.loadMoreService.showTill$.subscribe(
      (to) => (this.to = to)
    );

    this.newTaskVisibleSubscrioption =
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

  ngOnDestroy() {
    this.showFromSubscription.unsubscribe();
    this.showTillSubscription.unsubscribe();
    this.newTaskVisibleSubscrioption.unsubscribe();
  }
}
