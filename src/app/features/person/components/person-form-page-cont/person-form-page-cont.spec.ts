import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormPageCont } from './person-form-page-cont';

describe('PersonFormPageCont', () => {
  let component: PersonFormPageCont;
  let fixture: ComponentFixture<PersonFormPageCont>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFormPageCont],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonFormPageCont);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
