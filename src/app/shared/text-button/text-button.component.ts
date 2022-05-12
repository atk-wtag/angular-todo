import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.css'],
})
export class TextButtonComponent {
  @Input() class: string = 'text-button';
  @Input() text: string;

  @Input() onClick: Function;

  @ViewChild('textButtonIcon') textButtonIcon: ElementRef;

  constructor() {}
}
