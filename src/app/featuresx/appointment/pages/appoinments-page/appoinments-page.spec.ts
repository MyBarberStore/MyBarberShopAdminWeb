import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentsPage } from './appoinments-page';

describe('AppoinmentsPage', () => {
  let component: AppoinmentsPage;
  let fixture: ComponentFixture<AppoinmentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppoinmentsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoinmentsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
