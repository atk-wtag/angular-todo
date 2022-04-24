import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css'],
})
export class IconButtonComponent implements OnInit, AfterViewInit {
  showToolTip: boolean = false;

  @Input() toolTipText: string;
  @Input() icon: string;

  @ViewChild('iconButtonVar') iconButton: ElementRef;
  @ViewChild('tooltipVar') tooltip: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.iconButton.nativeElement.innerHTML = this.icon;
    this.tooltip.nativeElement.innerText = this.toolTipText;
  }

  toggleTooltipVisibility(className: string) {
    this.showToolTip = !this.showToolTip;
    this.showToolTip
      ? this.tooltip.nativeElement.classList.add(className)
      : this.tooltip.nativeElement.classList.remove(className);
  }
}
