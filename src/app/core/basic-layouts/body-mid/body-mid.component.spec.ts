import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {CountPipe} from 'src/app/core/pipes/count.pipe';
import {SearchPipe} from 'src/app/core/pipes/search.pipe';
import {BodyMidComponent} from './body-mid.component';

describe('BodyMidComponent', () => {
  let component: BodyMidComponent;
  let fixture: ComponentFixture<BodyMidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyMidComponent, CountPipe, SearchPipe],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [],
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
