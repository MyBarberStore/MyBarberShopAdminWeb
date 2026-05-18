import { Component, computed, inject, signal } from '@angular/core';
import { Card } from '../../../../shared/components/card/card';
import { Employee } from '../../../../shared/models/entities/employee';
import { EmployeesService } from '../../employees-service';
import { Table } from '../../../../shared/components/table/table';
import Swal from 'sweetalert2';
import { EmployeeForm } from '../../components/employee-form/employee-form';
import { AbsenceFormComponent } from '../../components/absence-form/absence-form';
import { Absence } from '../../../../shared/models/entities/absence';
import { AbsencesService } from '../../absences-service';

@Component({
  selector: 'app-employees-page',
  imports: [Card, Table, EmployeeForm, AbsenceFormComponent],
  templateUrl: './employees-page.html',
  styleUrl: './employees-page.css',
})
export class EmployeesPage {
  employeeService = inject(EmployeesService);
  absenceService = inject(AbsencesService);

  showEmployeesModal = signal<boolean>(false);
  selectedEmployee = signal<Employee | null>(null);
  showAbsencesModal = signal<boolean>(false);

  

  employees = signal<Employee[]>([]);
  activeEmployees = computed(() => 
    this.employees().filter(emp => emp.active).length
  );

  inactiveEmployees = computed(() => 
    this.employees().filter(emp => !emp.active).length
  );

  tableColumns = [
    { label: 'Nombre', key: 'name' },
    { label: 'Fecha de alta', key: 'hireDate', type: 'date'},
    { label: 'Estado', key: 'active', map: { true: 'Activo', false: 'Inactivo' } },
    
  ];  

  ngOnInit() {
    this.loadEmployees();
  }


  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => this.employees.set(data),
      error: (err) => console.error('Error fetching employees:', err)
    });
  }



 deleteEmployee(employee: Employee) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: `Vas a eliminar a ${employee.name}. Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar', // Cambiado para que sea claro
    cancelButtonText: 'No, mantener',
    confirmButtonColor: '#f89900',
    cancelButtonColor: '#64748b',
  }).then((result) => {
    if (result.isConfirmed) {
      this.employeeService.deleteEmployee(employee.id!).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'El empleado ha sido eliminado correctamente', 'success');
          this.loadEmployees();
        },
        error: (err) => {
          Swal.fire('Error', 'No se puede eliminar un empleado con citas asignadas. Prueba a cambiar su estado a inactivo.', 'error');
        }
      });
    }
  });
}

openModal(){
  this.selectedEmployee.set(null);
  this.showEmployeesModal.set(true);
}

closeModal(){
  this.showEmployeesModal.set(false);
}

openEditModal(employee: Employee) {
    this.selectedEmployee.set(employee);
    this.showEmployeesModal.set(true);
  }

handleSave(employee : Employee) {
    if (this.selectedEmployee()){
      this.updateEmployee(employee)
    }else{
      this.createEmployee(employee)
    }
  }

  updateEmployee(employee: Employee) {
  // Llamamos al servicio pasando el ID (o 0 si por alguna razón no existe) y el objeto
  employee.id = this.selectedEmployee()?.id
  this.employeeService.updateEmployee(this.selectedEmployee()?.id!, employee).subscribe({
    next: () => {
      // Notificación de éxito
      Swal.fire('Actualizado', 'Empleado modificado con éxito', 'success');
      
      // Recargamos la lista para que la tabla y los contadores (Signals) se actualicen
      this.loadEmployees(); 
      
      // Cerramos el modal si es que el update viene desde el formulario
      this.closeModal();
    },
    error: (err) => {
      // Capturamos el error del backend (como un 404 si no existe o validaciones)
      const msg = err.error || 'No se pudo actualizar la información del empleado';
      Swal.fire('Error', msg, 'error');
    }
  });
}

  createEmployee(newEmployee: Employee){
    this.employeeService.createEmployee(newEmployee).subscribe(() => {
      this.loadEmployees(); 
      this.closeModal();    
    });
    
  }

  openAbsences(employee: Employee) {
    this.selectedEmployee.set(employee)
    this.showAbsencesModal.set(true);
  }

  closeAbsences(){
    this.selectedEmployee.set(null);
    this.showAbsencesModal.set(false);
  }

  createAbsence(newAbsence: Absence) {

    Swal.fire({
      title: '¿Confirmar ausencia?',
      text: `Vas a programar una ausencia para ${this.selectedEmployee()?.name}. Las citas asignadas a ese empleado durante esas fechas se cancelarán automáticamente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, programar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#f89900',
      cancelButtonColor: '#64748b',
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveAbsence(newAbsence);
      }
    });
  }


  saveAbsence(newAbsence: Absence) {
  this.absenceService.createAbsence(newAbsence).subscribe({
    // CASO ÉXITO
    next: () => {
      Swal.fire('Ausencia programada', 'La ausencia ha sido programada correctamente', 'success');
      this.closeAbsences();
    },
    
    // CASO ERROR
    error: (err) => {
      // Intentamos extraer el mensaje del servidor. 
      const errorMessage = err.error?.message || err.error || 'Ocurrió un fallo inesperado';
      
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#ef4444' // Un rojo vibrante
      });
      
      console.error('Error al crear ausencia:', err);
    }
  });
  }
}


