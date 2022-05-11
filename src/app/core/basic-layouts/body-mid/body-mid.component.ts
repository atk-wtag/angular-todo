import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AddNewService } from 'src/app/core/services/addnew/addNew.service';
import { TodoStoreService } from 'src/app/core/services/state/todoStore.service';
import { LoadMoreService } from '../../services/loadmore/load-more.service';

@Component({
  selector: 'app-body-mid',
  templateUrl: './body-mid.component.html',
  styleUrls: ['./body-mid.component.css'],
})
export class BodyMidComponent implements OnInit, AfterViewChecked, OnDestroy {
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
  autoScrollSubscription: Subscription;

  lastScroll: number = 0;
  currentScroll: number;

  @ViewChild('bottomScroll') private _scrollBottom: ElementRef;

  constructor(
    public state: TodoStoreService,
    private _router: Router,
    private _addNewService: AddNewService,
    public loadMoreService: LoadMoreService
  ) {
    this._addNewService.newTask = false;
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

    this.autoScrollSubscription =
      this.loadMoreService.autoScrollCount.subscribe((value) => {
        this.currentScroll = value;
      });
  }

  ngOnInit() {
    if (this.currentRoute === '/all') this.todosToRender = this.state.todos$;
    else if (this.currentRoute === '/incomplete')
      this.todosToRender = this.state.incompleteTodos$;
    else this.todosToRender = this.state.completedTodos$;
  }

  ngAfterViewChecked() {
    if (this.currentScroll > this.lastScroll) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      window.scrollBy(0, this._scrollBottom.nativeElement.scrollHeight);
      this.lastScroll = this.currentScroll;
    } catch (err) {}
  }

  ngOnDestroy() {
    this.loadMoreService.reset();
    this.showFromSubscription.unsubscribe();
    this.showTillSubscription.unsubscribe();
    this.newTaskVisibleSubscrioption.unsubscribe();
    this.autoScrollSubscription.unsubscribe();
  }
}
