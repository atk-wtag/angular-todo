import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
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

  @HostListener('mouseover') mouseOver() {
    this.toggleTooltipVisibility();
  }

  @HostListener('mouseout') mouseOut() {
    this.toggleTooltipVisibility();
  }

  @ViewChild('iconButtonVar') iconButton!: ElementRef;
  @ViewChild('tooltipVar') tooltip!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.iconButton.nativeElement.innerHTML = this.icon;
  }

  toggleTooltipVisibility() {
    const className: string = 'icon-button__tooltip--show';
    this.showToolTip = !this.showToolTip;
    this.showToolTip
      ? this.tooltip.nativeElement.classList.add(className)
      : this.tooltip.nativeElement.classList.remove(className);
  }
}
