import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.css'],
})
export class TextButtonComponent implements OnInit {
  @Input() class: string = 'textButton';
  @Input() text: string;

  @ViewChild('textButtonIcon') textButtonIcon: ElementRef;

  constructor() {}

  ngOnInit(): void {}
}
