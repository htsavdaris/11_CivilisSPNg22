import { TestBed } from '@angular/core/testing';

import { PersonAttributeViewService } from './person-attribute-view-service';

describe('PersonAttributeViewService', () => {
  let service: PersonAttributeViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonAttributeViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
