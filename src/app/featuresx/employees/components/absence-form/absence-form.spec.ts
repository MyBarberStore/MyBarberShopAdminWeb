import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceFormComponent } from './absence-form';

describe('AbsenceForm', () => {
  let component: AbsenceFormComponent;
  let fixture: ComponentFixture<AbsenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
