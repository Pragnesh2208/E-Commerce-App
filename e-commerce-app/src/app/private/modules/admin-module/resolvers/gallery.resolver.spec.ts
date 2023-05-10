import { TestBed } from '@angular/core/testing';

import { GalleryComponentResolver } from './gallery.resolver';

describe('GalleryComponentResolver', () => {
  let resolver: GalleryComponentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GalleryComponentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
