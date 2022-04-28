import { TestBed } from '@angular/core/testing';

import { NoTodosService } from './no-todos.service';

describe('NoTodosService', () => {
  let service: NoTodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoTodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
