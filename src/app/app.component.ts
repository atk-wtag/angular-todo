import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { environment } from '../environments/environment.prod';
import { BodySpinnerService } from './core/services/bodySpinner/body-spinner.service';
import { LoadingSplashService } from './core/services/loadingSplash/loading-splash.service';
import { LoadMoreService } from './core/services/loadmore/load-more.service';
import { NoTodosService } from './core/services/NoTodos/no-todos.service';
import { TodoStoreService } from './core/services/state/todoStore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck, AfterViewChecked {
  title = 'Todo';
  todos: any;
  spinner: boolean = false;
  noTodos: boolean;
  noTodoText: string;

  noIncompleteTodoText: string = 'No incomplete todos!';
  noCompleteTodoText: string = 'No Complete todos!';
  noAllTodoText: string = `You Haven't Added Any Todos Yet!`;

  @ViewChild('mainBody') mainBody: ElementRef;
  @ViewChild('routerBody') routerBody: ElementRef;
  @ViewChild('noTodosTextTemplate') noTodosTextTemplate: ElementRef;

  constructor(
    public state: TodoStoreService,
    private _loadMoreService: LoadMoreService,
    private _router: Router,
    private _noTodosService: NoTodosService,
    private _changeDetector: ChangeDetectorRef,
    private _bodySpinnerService: BodySpinnerService,
    public loadingSplashService: LoadingSplashService
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
          }, environment.loadingDelay);
        }
      }
    });
  }

  ngDoCheck() {
    this._changeDetector.detectChanges();
  }

  ngAfterViewChecked() {
    const filterButtons = document.getElementById('filterButtonDiv');
    const searchButton = document.getElementById('searchButton');

    if (this.noTodosTextTemplate) {
      if (this._router.url === '/incomplete')
        this.noTodoText = this.noIncompleteTodoText;
      else if (this._router.url === '/complete')
        this.noTodoText = this.noCompleteTodoText;
      else {
        this.noTodoText = this.noAllTodoText;
        filterButtons?.classList.add('disable-no-blur');
        searchButton?.classList.add('disable-no-blur');
      }
      this._changeDetector.detectChanges();
    } else {
      filterButtons?.classList.remove('disable-no-blur');
      searchButton?.classList.remove('disable-no-blur');
    }
  }
}
