import { TestBed } from '@angular/core/testing';

import { EklogikiDomi } from './eklogiki-domi';

describe('EklogikiDomi', () => {
  let service: EklogikiDomi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EklogikiDomi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
