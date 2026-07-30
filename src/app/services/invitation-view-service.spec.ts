import { TestBed } from '@angular/core/testing';

import { InvitationViewService } from './invitation-view-service';

describe('InvitationViewService', () => {
  let service: InvitationViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitationViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
