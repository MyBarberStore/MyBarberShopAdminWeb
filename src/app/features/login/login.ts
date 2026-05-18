import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/auth/auth-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(AuthService);
  router = inject(Router);

  errorMessage = signal<string | null>(null);
  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', {nonNullable: true}),
  });

  onLogin() {
  //  Limpiamos cualquier error previo para que el usuario vea que algo está pasando
  this.errorMessage.set(null);

  //  Extraemos los datos del formulario de forma segura
  const { email, password } = this.loginForm.getRawValue();

  // Llamamos al servicio de autenticación
  this.authService.login(email, password).subscribe({
    next: (response) => {
      console.log('Respuesta:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      // Obtenemos el rol decodificado del token que acabamos de guardar
      const role = this.authService.getUserRole();
      if (role) {
        localStorage.setItem('userRole', role);
        console.log('Rol detectado y guardado:', role);
      }

      // Si es admin, al dashboard
      if (this.authService.isAdmin()) {
        console.log('Navegando al panel de Administrador...');
        this.router.navigate(['/dashboard']); 
      } else{
        console.log('Usuario autenticado pero sin rol de admin. Redirigiendo a página de usuario...');
      }
    },
    error: (err) => {
      // ERROR: El servidor o el navegador han bloqueado la petición
      console.error('Error en la suscripción:', err);

      // Manejo dinámico de mensajes según el código de estado HTTP
      if (err.status === 401 || err.status === 403) {
        this.errorMessage.set('Credenciales inválidas. Revisa tu email y contraseña.');
      } else if (err.status === 404) {
        this.errorMessage.set('Usuario no encontrado.');
      } else if (err.status === 0) {
        this.errorMessage.set('Error de red o CORS: El servidor no responde.');
      } else {
        this.errorMessage.set('Ha ocurrido un error inesperado. Inténtalo de nuevo.');
      }
    }
  });
}


}
