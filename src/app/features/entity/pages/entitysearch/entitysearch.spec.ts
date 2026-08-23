import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entitysearch } from './entitysearch';

describe('Entitysearch', () => {
  let component: Entitysearch;
  let fixture: ComponentFixture<Entitysearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entitysearch],
    }).compileComponents();

    fixture = TestBed.createComponent(Entitysearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
