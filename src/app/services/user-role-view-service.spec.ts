import { TestBed } from '@angular/core/testing';

import { UserRoleViewService } from './user-role-view-service';

describe('UserRoleViewService', () => {
  let service: UserRoleViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoleViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
