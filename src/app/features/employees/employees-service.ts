import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../shared/models/entities/employee';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/employees';


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  }

  createEmployee(newEmployee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}`, newEmployee)
  }

  deleteEmployee(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  updateEmployee(id:number, employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee)
  }
  
}
