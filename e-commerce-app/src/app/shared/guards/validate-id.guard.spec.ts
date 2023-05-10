import { TestBed } from '@angular/core/testing';

import { ValidateIdGuard } from './validate-id.guard';

describe('ValidateIdGuard', () => {
  let guard: ValidateIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
