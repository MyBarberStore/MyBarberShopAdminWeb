import { Component, inject, input } from '@angular/core';
import { DashboardPage } from '../../pages/dashboard-page/dashboard-page';
import { ServiceCountDTO } from '../../../../shared/models/dto/service-count';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css',
})
export class ServiceCard {
  serviceList = input<ServiceCountDTO[]>([]);

  ngOnInit() {
    console.log("Service list en ServiceCard:", this.serviceList());
  }
}
