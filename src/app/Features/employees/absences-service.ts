import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Absence } from '../../shared/models/entities/absence';

@Injectable({
  providedIn: 'root',
})
export class AbsencesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/absences';

  createAbsence(newAbsence: Absence){
    return this.http.post<Absence>(`${this.apiUrl}`, newAbsence);
  }

  updateAbsence(id: number, updatedAbsence: Absence){
    return this.http.put<Absence>(`${this.apiUrl}/${id}`, updatedAbsence);
  }

  deleteAbsence(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAbsencesByEmployee(employeeId: number){
    return this.http.get<Absence[]>(`${this.apiUrl}/employee/${employeeId}`);
  } 

  
}
