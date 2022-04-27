import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TodoStoreService } from 'src/app/services/state/todoStore.service';
import { Todo } from '../../models/todo.model';
import { SanitizeService } from '../../services/sanitization/sanitize.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, AfterViewChecked {
  editValue: string;
  enableEdit: boolean = false;
  spinner: boolean = false;

  @Input('todo') todoObject: any;

  @ViewChild('editTextarea') textArea: ElementRef;
  @ViewChild('todoMain') todoMain: ElementRef;

  constructor(
    private _state: TodoStoreService,
    private _router: Router,
    private _sanitizationService: SanitizeService
  ) {}

  ngOnInit(): void {
    this.editValue = this.todoObject.description;
  }

  ngAfterViewChecked(): void {
    this.textArea ? this.textArea.nativeElement.focus() : undefined;
  }

  getMarkasDoneIcon() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.285 0L9 11.567L3.714 6.556L0 10.272L9 19L24 3.715L20.285 0Z" fill="#BBBDD0"></path>
  </svg>`;
  }

  getEditIcon() {
    return `<svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.127 22.562L0 24L1.438 16.872L7.127 22.562ZM8.541 21.148L19.769 9.923L14.079 4.231L2.852 15.458L8.541 21.148ZM18.309 0L15.493 2.817L21.184 8.508L24 5.689L18.309 0V0Z"
        fill="#BBBDD0"
      ></path>
    </svg>`;
  }

  getDeleteIcon() {
    return `<svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17 24H3C1.896 24 1 23.104 1 22V6H19V22C19 23.104 18.104 24 17 24ZM8 10C8 9.448 7.552 9 7 9C6.448 9 6 9.448 6 10V19C6 19.552 6.448 20 7 20C7.552 20 8 19.552 8 19V10ZM14 10C14 9.448 13.552 9 13 9C12.448 9 12 9.448 12 10V19C12 19.552 12.448 20 13 20C13.552 20 14 19.552 14 19V10ZM20 5H0V3H6V1.5C6 0.673 6.673 0 7.5 0H12.5C13.325 0 14 0.671 14 1.5V3H20V5ZM8 3H12V2H8V3Z"
        fill="#BBBDD0"
      ></path>
    </svg>`;
  }

  compareDates(d1: string, d2: string) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const difference = Math.floor(
      (Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) -
        Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())) /
        (1000 * 60 * 60 * 24)
    );

    if (difference > 1) {
      return `${difference} days`;
    } else if (difference === 1) {
      return `${difference} day`;
    } else {
      return 'less than a day';
    }
  }

  deleteTodo(todo: Todo) {
    this.showSpinner();
    console.log(47);
    this._state.removeTodo(todo);
  }

  markAsDone(todo: Todo) {
    this.showSpinner();
    this._state.setCompleted(todo);
    if (this.enableEdit) {
      todo.description !== this.textArea.nativeElement.value
        ? this.updateTodo(todo)
        : (this.enableEdit = !this.enableEdit);
    }
  }

  updateTodo(todo: Todo) {
    const value = this._sanitizationService.sanitizeString(this.editValue);
    if (value) {
      this.showSpinner();
      this.enableEdit = !this.enableEdit;
      this._state.updateTodo(todo, value);
    }
  }

  onKeyDown(e: any) {
    if (e.key === 'Enter') {
      this.updateTodo(this.todoObject);
    }
  }

  showSpinner() {
    this.todoMain.nativeElement.classList.add('disable');
    this.spinner = !this.spinner;
    setTimeout(() => {
      this.spinner = !this.spinner;
      this.todoMain.nativeElement.classList.remove('disable');
    }, 300);
  }
}
