import {TestBed} from '@angular/core/testing';

import {ProductComponentResolver} from './product.resolver';

describe('ProductComponentResolver', () => {
  let resolver: ProductComponentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductComponentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
