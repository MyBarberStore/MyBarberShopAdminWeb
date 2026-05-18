import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsCard } from './appointments-card';

describe('AppointmentsCard', () => {
  let component: AppointmentsCard;
  let fixture: ComponentFixture<AppointmentsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
