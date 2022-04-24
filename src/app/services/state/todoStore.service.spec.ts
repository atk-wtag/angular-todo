import {TestBed} from '@angular/core/testing';

import {TodoStoreService} from './todoStore.service';

describe('TodoStateService', () => {
  let service: TodoStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
