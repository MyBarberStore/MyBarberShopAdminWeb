import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FullScheduleRequest } from '../../shared/models/dto/schedule';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
   private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/shifts';

  updateAllHours(fullSchedule: FullScheduleRequest): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/all`, fullSchedule);
}
  
}
