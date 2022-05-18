import { TestBed } from '@angular/core/testing';
import { BodySpinnerService } from './body-spinner.service';

describe('BodySpinnerService', () => {
  let service: BodySpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodySpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
