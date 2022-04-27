import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BodySpinnerService } from './services/bodySpinner/body-spinner.service';
import { LoadMoreService } from './services/loadmore/load-more.service';
import { NoTodosService } from './services/NoTodos/no-todos.service';
import { TodoStoreService } from './services/state/todoStore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Todo App';
  showSplash: boolean = true;
  todos: any;
  spinner: boolean = false;
  noTodos: boolean;

  @ViewChild('mainBody') mainBody: ElementRef;
  @ViewChild('routerBody') routerBody: ElementRef;

  constructor(
    public state: TodoStoreService,
    private _loadMoreService: LoadMoreService,
    private _router: Router,
    private _noTodosService: NoTodosService,
    private _changeDetector: ChangeDetectorRef,
    private _bodySpinnerService: BodySpinnerService
  ) {
    this._bodySpinnerService.spinner.subscribe(
      (value) => (this.spinner = value)
    );
  }

  ngOnInit() {
    this._noTodosService.noTodos.subscribe((value) => {
      this.noTodos = value;
    });
    this.state.getAllTodos();

    this._loadMoreService.showLoadMore.next(true);
    this._router.events.subscribe((event: Event) => {
      if (this.mainBody) {
        if (event instanceof NavigationStart) {
          this._bodySpinnerService.toggleSpinner();
          this.mainBody.nativeElement.classList.add('disable');
        }
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            this._bodySpinnerService.toggleSpinner();
            this.mainBody.nativeElement.classList.remove('disable');
          }, 300);
        }
      }
    });

    setTimeout(() => {
      this.showSplash = !this.showSplash;
    }, 1500);
  }
  ngDoCheck() {
    this._changeDetector.detectChanges();
  }
}
