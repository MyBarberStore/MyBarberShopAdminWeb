import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FullScheduleRequest } from '../../sharedx/models/dto/schedule';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
   private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/shifts';

  updateAllHours(fullSchedule: FullScheduleRequest): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/all`, fullSchedule);
}
  
}
