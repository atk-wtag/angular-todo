import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTopComponent } from './body-top.component';

describe('BodyTopComponent', () => {
  let component: BodyTopComponent;
  let fixture: ComponentFixture<BodyTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
