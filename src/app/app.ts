import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from './shared/components/side-bar/side-bar';
import { Layout } from './shared/components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBar, Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BarberStore');
}
