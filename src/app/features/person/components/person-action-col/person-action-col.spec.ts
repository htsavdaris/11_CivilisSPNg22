import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonActionCol } from './person-action-col';

describe('PersonActionCol', () => {
  let component: PersonActionCol;
  let fixture: ComponentFixture<PersonActionCol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonActionCol],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonActionCol);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
