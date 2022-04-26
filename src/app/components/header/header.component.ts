import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('show-hide-toastr', [
      state(
        'show',
        style({
          opacity: 1,
          top: '8%',
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
          top: '4%',
        })
      ),
      transition('show => hide', [animate('500ms')]),
      transition('hide => show', [animate('350ms')]),
    ]),
  ],
})
export class HeaderComponent {
  constructor(public httpService: HttpService) {}

  // toggle() {
  //   this.error = !this.error;
  //   setTimeout(() => {
  //     this.error = !this.error;
  //   }, 1500);
  // }
}
