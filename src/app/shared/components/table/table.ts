import { Component, input, Input, output } from '@angular/core';
import { TableColumn } from './table-column';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [DatePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  data = input<any[]>([]);
  columns = input<TableColumn[]>([]);
  emptyMessage = input<string>('No se han encontrado registros');
  showEdit = input<boolean>(true);
  showDelete = input<boolean>(true);

  // Salidas para las acciones
  onEdit = output<any>();
  onDelete = output<any>();
  onSpecialAction = output<any>();

}
