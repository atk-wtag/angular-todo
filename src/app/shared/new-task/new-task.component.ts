import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoStoreService } from 'src/app/core/services/state/todoController.service';
import { environment } from 'src/environments/environment';
import { AddNewService } from '../../core/services/addnew/addNew.service';
import { SanitizeService } from '../../core/services/sanitization/sanitize.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements AfterViewInit {
  spinner: boolean = false;
  @ViewChild('newTextArea') textArea: ElementRef;
  @ViewChild('addTodoMain') addTodoMain: ElementRef;

  constructor(
    private _addNewService: AddNewService,
    private _state: TodoStoreService,
    private _sanitizationService: SanitizeService,
    private _router: Router
  ) {}

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

  deleteCard() {
    this._addNewService.newTask = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.textArea.nativeElement.focus();
    }, 0);
  }

  addTask(): void {
    const value = this._sanitizationService.sanitizeString(
      this.textArea.nativeElement.value
    );
    if (value) {
      this.textArea.nativeElement.disabled = true;
      this.showSpinner();
      this._state.addTodo(value);
      if (this._router.url === '/complete') {
        setTimeout(() => {
          this._router.navigateByUrl('/all');
        }, environment.loadingDelay * 3);
      }
    }

    return;
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.addTask();
    }
    return;
  }

  showSpinner() {
    this.addTodoMain.nativeElement.classList.add('disable');
    this.spinner = !this.spinner;
  }
}
