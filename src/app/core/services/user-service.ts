import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../sharedx/models/entities/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/users';

  searchUsersByName(name: string): Observable<User[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<User[]>(`${this.apiUrl}/search`, { params });
  }
  
}
