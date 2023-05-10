import {TestBed} from '@angular/core/testing';

import {OrderListResolver} from './order-list.resolver';

describe('OrderListResolver', () => {
  let resolver: OrderListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
