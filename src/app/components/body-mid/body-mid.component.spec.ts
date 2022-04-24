import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMidComponent } from './body-mid.component';

describe('BodyMidComponent', () => {
  let component: BodyMidComponent;
  let fixture: ComponentFixture<BodyMidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyMidComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyMidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
