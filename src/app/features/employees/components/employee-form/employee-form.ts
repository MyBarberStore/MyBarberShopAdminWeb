import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../../../shared/models/entities/employee';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  private fb = inject(FormBuilder);

  isEdit = computed(() => !!this.employeeToEdit())
  tittle = computed(() => this.isEdit() ? 'Editar empleado' : 'Nuevo empleado')
  employeeToEdit = input<Employee | null>(null);

  // Definimos salidas para cerrar o guardar
  close = output<void>();
  save = output<any>();

  employeeForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    hireDate: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });


  ngOnInit() {
    if (this.isEdit()) {
      const employee = this.employeeToEdit()!;
      this.employeeForm.patchValue({
        name: employee.name,
        hireDate: employee.hireDate,
        active: employee.active,
      
      });
    }
  }

  onSubmit() {
  if (this.employeeForm.invalid) {
    Swal.fire('Formulario incompleto', 'Por favor, rellena todos los campos obligatorios (*)', 'error');
    this.employeeForm.markAllAsTouched(); // Esto pone todos los inputs en rojo
    return;
  }else{
    const employee: Employee = {
        name: this.employeeForm.get('name')?.value,
        active: this.employeeForm.get('active')?.value,
        hireDate: this.employeeForm.get('hireDate')!.value
    }
    this.save.emit(employee)
  }
 
}

  onClose() {
    this.close.emit();
  }


}
