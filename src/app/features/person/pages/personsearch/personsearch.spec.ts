import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Personsearch } from './personsearch';

describe('Personsearch', () => {
  let component: Personsearch;
  let fixture: ComponentFixture<Personsearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personsearch],
    }).compileComponents();

    fixture = TestBed.createComponent(Personsearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
