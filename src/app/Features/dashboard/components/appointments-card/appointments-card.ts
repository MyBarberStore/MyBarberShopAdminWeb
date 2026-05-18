import { Component, computed, inject, input, signal } from '@angular/core';
import { AppointmentItem } from '../appointment-item/appointment-item';
import { Appointment } from '../../../../sharedx/models/entities/appointment';
import { AppointmentService } from '../../../appointment/appointment-service';

@Component({
  selector: 'app-appointments-card',
  imports: [AppointmentItem],
  templateUrl: './appointments-card.html',
  styleUrl: './appointments-card.css',
})
export class AppointmentsCard {
  appointmentService = inject(AppointmentService);
  appointmentsList = input<Appointment[]>([]); 
  
  sortedAppointments = computed(() => {
  return [...this.appointmentsList()].sort((a, b) => 
    a.startTime.localeCompare(b.startTime)
  );
});



}
