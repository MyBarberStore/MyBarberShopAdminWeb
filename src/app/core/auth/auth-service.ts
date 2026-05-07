import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../../shared/models/dto/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/auth';
  private router = inject(Router);


  login(email: string, password: string): Observable<AuthResponse> {
    const loginRequest = {
      email: email,
      password: password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.role || null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  
  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  this.router.navigate(['/login']);
}


  
  
}
