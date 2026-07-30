import { TestBed } from '@angular/core/testing';

import { CaseViewService } from './case-view-service';

describe('CaseViewService', () => {
  let service: CaseViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
