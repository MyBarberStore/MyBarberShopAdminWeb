import { Component, computed, inject, signal } from '@angular/core';
import { AppointmentService } from '../../appointment-service';
import { Appointment } from '../../../../sharedx/models/entities/appointment';
import Swal from 'sweetalert2';
import { AppointmentForm } from '../../components/appointment-form/appointment-form';
import { AppointmentRequest } from '../../../../sharedx/models/dto/appointment-request';
import { EmployeesService } from '../../../employees/employees-service';
import { Employee } from '../../../../sharedx/models/entities/employee';
import { Table } from '../../../../sharedx/componentss/table/table';
import { invoiceRequest } from '../../../../sharedx/models/dto/invoice-request';
import { BillingService } from '../../../billing/billing-service';
import { AppointmentStatus } from '../../../../sharedx/models/entities/appointment';


@Component({
  selector: 'app-appoinments-page',
  imports: [AppointmentForm, Table],
  templateUrl: './appoinments-page.html',
  styleUrl: './appoinments-page.css',
})
export class AppoinmentsPage {
  appointmentService = inject(AppointmentService); 
  employeesService = inject(EmployeesService);
  billingService = inject(BillingService); // Inyectamos el servicio de facturación para generar la factura al finalizar la cita

  appointments = signal<Appointment[]>([]);
  selectedDate = signal<string>(new Date().toISOString().split('T')[0]);
  showModal = signal(false);
  employees = signal<Employee[]>([]);
  selectedAppointment = signal<Appointment | null>(null);

  //columnas de la tabla
  tableColumns = [
    { label: 'Cliente', key: 'customerName' },
    { label: 'Teléfono', key: 'telNumber' },
    { label: 'Empleado', key: 'employeeName' },
    { label: 'Servicio', key: 'serviceName' },
    { label: 'Fecha', key: 'date', type: 'date'},
    { label: 'Hora', key: 'startTime' },
    { label: 'Estado', key: 'status', map: { 'CONFIRMED': 'Confirmada', 'COMPLETED': 'Completada', 'CANCELLED': 'Cancelada' } },

  ]

  // Nuevo estado para el filtro de empleado
  filterEmployeeId = signal<string>("all");
  // Computed para filtrar las citas según el empleado seleccionado
  filteredAppointments = computed(() => {
  const appointments = this.appointments();
  const filter = this.filterEmployeeId();
  let result: Appointment[];

  // 1. Aplicamos el filtro con estructura normal
  if (filter === "all") {
    // Hacemos una copia para no mutar el original
    result = [...appointments];
  } else {
    // Filtramos por el ID del empleado
    result = appointments.filter(app => app.employeeId === Number(filter));
  }

  // 2. Ordenamos el resultado (da igual si viene filtrado o no)
  // Usamos localeCompare para que "09:00" vaya antes que "10:30"
  result.sort((a, b) => a.startTime.localeCompare(b.startTime));
  return result;
});

  
  dateLabel = computed(() => {
    return new Date(this.selectedDate()).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  });

  ngOnInit() {
    this.loadEmployees();
    this.onDateChange({ target: { value: this.selectedDate() } }); 
  }


  loadEmployees() {
    this.employeesService.getEmployees().subscribe(employees => {
      this.employees.set(employees);
    }); 
  }



  setToday() {
    this.selectedDate.set(new Date().toISOString().split('T')[0]);
    this.onDateChange({ target: { value: this.selectedDate() } }); // Simula un cambio de fecha para cargar las citas de hoy
  }

  onDateChange(event: any) {
    this.selectedDate.set(event.target.value);
    this.appointmentService.getDailyAppointments(this.selectedDate()).subscribe(appointments => {
      this.appointments.set(appointments);
    });
  }


  onCancel(appointment: Appointment) {
    if (appointment.status === 'CANCELLED') {
      Swal.fire('Ya cancelada', 'Esta cita ya ha sido cancelada.', 'info');
      return;
    }

    if (appointment.status === 'COMPLETED') {
      Swal.fire('No cancelable', 'No se pueden cancelar citas completadas.', 'info');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
      confirmButtonColor: '#f89900',
      cancelButtonColor: '#64748b',

    }).then((result) => {
      const appointmentRequest = this.mapToRequest(appointment);
      if (result.isConfirmed) {
        this.appointmentService.updateAppointment(appointment.id, { ...appointmentRequest, status: 'CANCELLED' }).subscribe(() => {
          Swal.fire('Cancelada', 'La cita ha sido cancelada', 'success');
          // Actualiza la lista de citas después de cancelar
          this.onDateChange({ target: { value: this.selectedDate() } });
        }, error => {
          Swal.fire('Error', 'No se pudo cancelar la cita', 'error');
        });
      }
    });
  }

  openCreateModal() {
    this.selectedAppointment.set(null);
    this.showModal.set(true);
  }

  openEditModal(appointment: Appointment) {
    this.selectedAppointment.set(appointment);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  handleSave(appointment: AppointmentRequest) {
    if (this.selectedAppointment()) {
      this.updateAppointment(appointment);
      this.onDateChange({ target: { value: this.selectedDate() } }); // Recarga las citas para mostrar la actualización
    } else {
      this.saveNewAppointment(appointment);
    }
  }

  employeeFilter(employeeId: string) {
  this.filterEmployeeId.set(employeeId);
}

saveNewAppointment(appointment: AppointmentRequest) {
   this.appointmentService.createAppointment(appointment).subscribe(() => {
      Swal.fire('Creada', 'La cita ha sido creada exitosamente', 'success');
      this.onDateChange({ target: { value: this.selectedDate() } }); // Recarga las citas para mostrar la nueva
    }, error => {
      Swal.fire('Error', 'No se pudo crear la cita', 'error');
    });
    this.closeModal(); // Cierra el modal después de guardar

}

updateAppointment(appointment: AppointmentRequest) {
  if(appointment.status === 'CANCELLED') {
    Swal.fire('No modificable', 'No se pueden modificar citas canceladas o completadas.', 'info');
    return;
  }
    this.appointmentService.updateAppointment(appointment.id ?? 0, appointment).subscribe({
        next: (updatedApp) => {
          Swal.fire('Actualizada', 'Cita modificada con éxito', 'success');
          this.onDateChange({ target: { value: this.selectedDate() } }); // Recargamos la lista
        },
        error: (err) => {
          // Aquí capturas el 409 Conflict o el 404
          const msg = err.error || 'No se pudo actualizar la cita';
          Swal.fire('Error', msg, 'error');
        }
      });
  }

  billAppointment(event: Appointment) {
  // 1. Validación rápida
  if (event.status === 'COMPLETED') {
    Swal.fire('No Facturable', 'Esta cita ya ha sido procesada.', 'info');
    return;
  }else if (event.status === 'CANCELLED') {
    Swal.fire('No Facturable', 'No se pueden facturar citas canceladas.', 'info');
    return;
  }

  // 2. Diálogo de SweetAlert (Configuración e Interfaz)
  Swal.fire({
    title: 'Finalizar Cita',
    text: `Método de pago para: ${event.customerName}`,
    icon: 'question',
    input: 'radio',
    inputOptions: { 'CASH': 'Efectivo', 'CARD': 'Tarjeta' },
    inputValidator: (value) => !value ? '¡Debes seleccionar un método!' : null,
    showCancelButton: true,
    confirmButtonText: 'Generar Factura',
    confirmButtonColor: '#28a745'
  }).then((result) => {
    if (!result.isConfirmed) return;

    // 3. Flujo Lógico: Primero Factura, luego Actualizar Cita
    const invoiceReq: invoiceRequest = {
      appointmentId: event.id,
      paymentMethod: result.value,
      total: event.price
    };

    this.billingService.createInvoice(invoiceReq).subscribe({
      next: () => {
        // Solo actualizamos la cita si la factura se creó bien
        console.log(event.customerId, event.employeeId, event.serviceId);
        const appointmentReq: AppointmentRequest = {
          id: event.id,
          date: event.date,
          startTime: event.startTime,
          telNumber: event.telNumber,
          clientId: event.customerId,
          employeeId: event.employeeId,
          serviceId: event.serviceId,
          status: AppointmentStatus.Completed
        };
        //una vez generada factura, se actualiza la cita
        this.updateAppointment(appointmentReq);
        Swal.fire('Éxito', 'Factura generada y cita completada', 'success');
      },
      error: () => Swal.fire('Error', 'No se pudo generar la factura', 'error')
    });
  });
}

private mapToRequest(appointment: Appointment): AppointmentRequest {
  return {
    id: appointment.id,
    date: appointment.date,
    startTime: appointment.startTime,
    telNumber: appointment.telNumber,
    clientId: appointment.customerId, // Traducimos customerId a clientId
    employeeId: appointment.employeeId,
    serviceId: appointment.serviceId,
    status: appointment.status // El Enum se envía como string automáticamente
  };
}
}
