import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../sharedx/models/entities/appointment';
import { DashboardData } from '../../sharedx/models/dto/dashboard-data';
import { Service } from '../../sharedx/models/entities/service';
import { AppointmentRequest } from '../../sharedx/models/dto/appointment-request';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/appointments'; 

  


  createAppointment(appointmentData: AppointmentRequest): Observable<AppointmentRequest> {
    return this.http.post<AppointmentRequest>(`${this.apiUrl}`, appointmentData);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateAppointment(id: number, appointmentData: AppointmentRequest): Observable<AppointmentRequest> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.put<AppointmentRequest>(url, appointmentData);
}

  getDailyAppointments(date: string): Observable<Appointment[]>{
    const params = new HttpParams().set('date', date);
    return this.http.get<Appointment[]>(`${this.apiUrl}`, { params });
  }

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.apiUrl}/dashboardSummary`);
  }



  getAvailability(date: string, employeeId: number, excludeId?: number): Observable<string[]> {
  let params = new HttpParams()
    .set('date', date)
    .set('employeeId', employeeId.toString()); 

  // si excludeId existe, lo añadimos a los parámetros
  if (excludeId !== undefined && excludeId !== null) {
    params = params.set('excludeId', excludeId.toString());
  }

  return this.http.get<string[]>(`${this.apiUrl}/availability`, { params });
}

  getServices(): Observable<Service[]>{
    return this.http.get<Service[]>(`${this.apiUrl}/services`);
  }
}
