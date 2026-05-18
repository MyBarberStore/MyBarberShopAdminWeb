import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  @Input() title: string = '';
  @Input() value: string = '';
  @Input() trendText: string = '';
  @Input() trendClass: string = 'positive'; // para ponerlo en verde o rojo
  @Input() iconClass: string = ''; // ej: 'fas fa-calendar'
  @Input() iconBgColor: string = '#3b82f6';
}
