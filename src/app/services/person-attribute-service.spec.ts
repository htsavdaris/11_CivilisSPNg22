import { TestBed } from '@angular/core/testing';

import { PersonAttributeService } from './person-attribute-service';

describe('PersonAttributeService', () => {
  let service: PersonAttributeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonAttributeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
