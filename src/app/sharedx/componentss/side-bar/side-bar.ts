import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  user = signal<string>('name');
  email = signal<string>('email');

  authService = inject(AuthService);



  ngOnInit() {
    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);
      this.user.set(userData.name);
      this.email.set(userData.email);
    }

  }


}
