import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonActionDropdown } from './person-action-dropdown';

describe('PersonActionDropdown', () => {
  let component: PersonActionDropdown;
  let fixture: ComponentFixture<PersonActionDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonActionDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonActionDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
