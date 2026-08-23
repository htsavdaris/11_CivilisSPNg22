import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormPageCont } from './entity-form-page-cont';

describe('EntityFormPageCont', () => {
  let component: EntityFormPageCont;
  let fixture: ComponentFixture<EntityFormPageCont>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityFormPageCont],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityFormPageCont);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
