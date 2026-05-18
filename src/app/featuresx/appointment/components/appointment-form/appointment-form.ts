import { Component, computed, inject, input, output, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Appointment } from '../../../../sharedx/models/entities/appointment';
import { AppointmentRequest } from '../../../../sharedx/models/dto/appointment-request';
import { AppointmentService } from '../../appointment-service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../../sharedx/models/entities/employee';
import { EmployeesService } from '../../../employees/employees-service';
import { Service } from '../../../../sharedx/models/entities/service';
import { User } from '../../../../sharedx/models/entities/user';
import { UserService } from '../../../../core/services/user-service';
import { HtmlParser } from '@angular/compiler';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-appointment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css',
})
export class AppointmentForm {
  appointmentService = inject(AppointmentService);
  employeesService = inject(EmployeesService);
  userService = inject(UserService);

  showResults = signal(false);

  close = output<void>();
  saved = output<AppointmentRequest>();


  avaiability = signal<string[]>([]);
  employees = signal<Employee[]>([]);
  services = signal<Service[]>([]);
  users = signal<User[]>([]); 

  appointmentToEdit = input<Appointment | null>(null);
  private fb = inject(FormBuilder);

  dataInputs = this.fb.group({
    clientName: ['', Validators.required],
    clientId: [0], 
    phone: ['', Validators.required],
    time: ['', Validators.required],
    date: ['', Validators.required],
    employee: [0, Validators.required], 
    service: [0, Validators.required]
  });

  isEditMode = computed(() => !!this.appointmentToEdit());
  title = computed(() => this.isEditMode() ? 'Editar Cita' : 'Nueva Cita');
  btnText = computed(()=> this.isEditMode() ? 'Editar' : 'Crear')



  ngOnInit() {
    if (this.isEditMode()) {
      const appointment = this.appointmentToEdit()!;
      this.dataInputs.patchValue({
        clientName: appointment.customerName,
        clientId: appointment.customerId,
        phone: appointment.telNumber,
        time: appointment.startTime,
        date: appointment.date,
        employee: appointment.employeeId,
        service: appointment.serviceId
      });
    }

    this.loadEmployees();
    this.loadServices();
    this.loadAvailability();
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.dataInputs.invalid){
       Swal.fire('Formulario incompleto', 'Por favor, rellena todos los campos obligatorios (*)', 'error');
        this.dataInputs.markAllAsTouched(); 
        return;
    }

    const newAppointment: AppointmentRequest = {
    id: this.appointmentToEdit()?.id, 
    clientId: Number(this.dataInputs.get('clientId')?.value ?? 0),
    date: this.dataInputs.get('date')?.value ?? '',
    startTime: this.dataInputs.get('time')?.value ?? '',
    telNumber: this.dataInputs.get('phone')?.value ?? '',
    employeeId: Number(this.dataInputs.get('employee')?.value), // Aseguramos que sea número
    serviceId: Number(this.dataInputs.get('service')?.value ?? 0), 
    status: this.isEditMode() ? this.appointmentToEdit()!.status : 'CONFIRMED' // Si es edición, mantenemos el estado actual; si es creación, iniciamos como CONFIRMED
  };

    this.saved.emit(newAppointment);
  }

  loadAvailability() {
  const date = this.dataInputs.get('date')?.value;
  const employeeId = Number(this.dataInputs.get('employee')?.value);

  
  if (!date || !employeeId) return;
  const idToExclude = this.isEditMode() ? this.appointmentToEdit()?.id : undefined

  // HACEMOS UNA SOLA LLAMADA (Paso el ID como tercer argumento)
  this.appointmentService.getAvailability(date, employeeId, idToExclude)
    .subscribe(availability => {
      this.avaiability.set(availability);
      console.log('Horas recibidas:', availability); // Para que verifiques en consola
    });
}

  loadEmployees() {
    this.employeesService.getEmployees().subscribe(employees => {
      this.employees.set(employees);
    }); 
  }

  updateAvailability() {
    if (this.dataInputs.get('date')?.value && this.dataInputs.get('employee')?.value) {
      this.loadAvailability();
    }
  
  }

  loadServices() {
    this.appointmentService.getServices().subscribe(services => {
      this.services.set(services);
    });
  }

  searchUsersByName(name: Event) {
    const target = name.target as HTMLInputElement;
    this.userService.searchUsersByName(target.value).subscribe(users => {
      this.users.set(users);
      this.showResults.set(true);
    });
  }

  
  selectUser(client:User) {
    this.dataInputs.patchValue({
      clientName: client.name,
      clientId: client.id,
      phone: client.telNumber 
    });
    this.showResults.set(false); // Cerramos la lista
  }
}