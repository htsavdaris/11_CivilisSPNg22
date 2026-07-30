import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Personlist } from './personlist';

describe('Personlist', () => {
  let component: Personlist;
  let fixture: ComponentFixture<Personlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Personlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
