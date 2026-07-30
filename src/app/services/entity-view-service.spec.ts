import { TestBed } from '@angular/core/testing';

import { EntityViewService } from './entity-view-service';

describe('EntityViewService', () => {
  let service: EntityViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
