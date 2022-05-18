import { TestBed } from '@angular/core/testing';
import { LoadingSplashService } from './loading-splash.service';

describe('LoadingSplashService', () => {
  let service: LoadingSplashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingSplashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
