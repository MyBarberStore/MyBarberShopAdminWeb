

import { Component, inject, input, Input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Absence } from '../../../../shared/models/entities/absence';
import { Employee } from '../../../../shared/models/entities/employee';
import { AbsencesService } from '../../absences-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-absence-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './absence-form.html',
  styleUrl: './absence-form.css'
})
export class AbsenceFormComponent implements OnInit {
  employee = input<Employee | null>(null);
  close = output<void>();
  save = output<any>();

  absenceService = inject(AbsencesService);

  scheduledAbsences = signal<Absence[]>([]);


  private fb = inject(FormBuilder)
    absenceForm: FormGroup = this.fb.group({
    reason: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: [true, [Validators.required]]
  });

  
  ngOnInit(): void {
    this.absenceService.getAbsencesByEmployee(this.employee()?.id!).subscribe(data => this.scheduledAbsences.set(data));
  }

  onSubmit() {
    if (this.absenceForm.invalid) {
      Swal.fire('Formulario incompleto', 'Por favor, rellena todos los campos obligatorios (*)', 'error');
      this.absenceForm.markAllAsTouched();
      return;
    }

    const newAbsence: Absence = {
      id: 0, 
      employeeId: this.employee()?.id!,
      reason: this.absenceForm.get('reason')?.value,
      startDate: this.absenceForm.get('startDate')?.value,
      endDate: this.absenceForm.get('endDate')?.value
    };

    this.save.emit(newAbsence);
    this.absenceForm.reset();
  }

  onClose(){
    this.close.emit();
  }

  onDelete(id: number) {
    this.absenceService.deleteAbsence(id).subscribe(() => {
      this.scheduledAbsences.set(this.scheduledAbsences().filter(abs => abs.id !== id));
    });
  }
}