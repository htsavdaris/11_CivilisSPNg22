import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entitylist } from './entitylist';

describe('Entitylist', () => {
  let component: Entitylist;
  let fixture: ComponentFixture<Entitylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entitylist],
    }).compileComponents();

    fixture = TestBed.createComponent(Entitylist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
