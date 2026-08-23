import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormDialogCont } from './entity-form-dialog-cont';

describe('EntityFormDialogCont', () => {
  let component: EntityFormDialogCont;
  let fixture: ComponentFixture<EntityFormDialogCont>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityFormDialogCont],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityFormDialogCont);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
