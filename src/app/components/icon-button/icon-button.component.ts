import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css'],
})
export class IconButtonComponent implements AfterViewInit {
  showToolTip: boolean = false;

  @Input() toolTipText: string;
  @Input() icon: string;

  @ViewChild('iconButtonVar') iconButton!: ElementRef;
  @ViewChild('tooltipVar') tooltip!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.iconButton.nativeElement.innerHTML = this.icon;
  }

  toggleTooltipVisibility(className: string) {
    this.showToolTip = !this.showToolTip;
    this.showToolTip
      ? this.tooltip.nativeElement.classList.add(className)
      : this.tooltip.nativeElement.classList.remove(className);
  }
}
