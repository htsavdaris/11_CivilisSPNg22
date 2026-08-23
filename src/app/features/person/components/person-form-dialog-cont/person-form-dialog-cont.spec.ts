import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormDialogCont } from './person-form-dialog-cont';

describe('PersonFormDialogCont', () => {
  let component: PersonFormDialogCont;
  let fixture: ComponentFixture<PersonFormDialogCont>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFormDialogCont],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonFormDialogCont);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
