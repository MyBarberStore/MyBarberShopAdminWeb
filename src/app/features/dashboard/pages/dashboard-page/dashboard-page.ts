import { Component, inject, signal } from '@angular/core';
import { Card } from '../../../../shared/components/card/card';
import { AppointmentService } from '../../../appointment/appointment-service';
import { Appointment } from '../../../../shared/models/entities/appointment';
import { AppointmentsCard } from '../../components/appointments-card/appointments-card';
import { ServiceCard } from '../../components/service-card/service-card';
import { DashboardData } from '../../../../shared/models/dto/dashboard-data';


@Component({
  selector: 'app-dashboard',
  imports: [Card, AppointmentsCard, ServiceCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  appointmentService = inject(AppointmentService);
  dailyAppointments = signal<Appointment[]>([]);
  dashboardData = signal<DashboardData>({ employeesNumber: 0, availableSlots: 0, serviceCountDTO: [] });

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];

    this.loadDailyAppointments(today);
    this.loadDashboardData();
  }

  
  loadDailyAppointments(date: string) {
    this.appointmentService.getDailyAppointments(date).subscribe(appointments => {
    this.dailyAppointments.set(appointments);
    console.log("Citas diarias cargadas:", appointments);
    });
  }

  loadDashboardData() {
    this.appointmentService.getDashboardData().subscribe(data => {
      this.dashboardData.set(data);
    });
  }

}
