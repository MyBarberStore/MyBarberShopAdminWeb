import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../../shared/models/entities/service';


@Injectable({
  providedIn: 'root'
})
export class serviceService {
  private http = inject(HttpClient);
  
  // Ajusta esta URL a la de tu backend
  private readonly API_URL = 'http://localhost:8080/services';

  /**
   * Obtiene la lista completa de servicios
   */
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.API_URL);
  }

  /**
   * Crea un nuevo servicio en la base de datos
   * @param service Objeto con name, price y duration
   */
  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.API_URL, service);
  }

  /**
   * Elimina un servicio por su ID
   * @param id Identificador único del servicio
   */
  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

    /**
   * Actualiza un servicio existente
   * @param id Identificador del servicio a modificar
   * @param service Objeto con los nuevos datos
   */
  updateService(id: number, service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.API_URL}/${id}`, service);
  }
}