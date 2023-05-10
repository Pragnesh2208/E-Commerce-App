import { TestBed } from '@angular/core/testing';

import { CategoryComponentResolver } from './category.resolver';

describe('CategoryComponentResolver', () => {
  let resolver: CategoryComponentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoryComponentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
