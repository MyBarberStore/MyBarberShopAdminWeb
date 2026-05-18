import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentItem } from './appointment-item';

describe('AppointmentItem', () => {
  let component: AppointmentItem;
  let fixture: ComponentFixture<AppointmentItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
