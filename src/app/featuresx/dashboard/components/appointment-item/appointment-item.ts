import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-appointment-item',
  imports: [SlicePipe],
  templateUrl: './appointment-item.html',
  styleUrl: './appointment-item.css',
})
export class AppointmentItem {
  clientName = input<string>(''); // Nombre del cliente
  serviceType = input<string>(''); // Tipo de servicio (e.g., Corte, Barba)
  appointmentTime = input<string>(''); // Hora de la cita
  employeeName = input<string>(''); // Nombre del empleado asignado


}
