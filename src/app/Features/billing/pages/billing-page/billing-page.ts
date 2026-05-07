import { Component, inject, signal } from '@angular/core';
import { Card } from '../../../../shared/Components/card/card';
import { Table } from '../../../../shared/Components/table/table';
import { invoiceResponse } from '../../../../shared/models/dto/invoice-response';
import { BillingService } from '../../billing-service';
import sweetalert2 from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-billing-page',
  imports: [Card, Table, CurrencyPipe],
  templateUrl: './billing-page.html',
  styleUrl: './billing-page.css',
})
export class BillingPage {

  invoices = signal<invoiceResponse[]>([]);
  date = signal<string>(new Date().toISOString().split('T')[0]);
  incomesPerDay = signal<number>(0);
  emittedBills = signal<number>(0);
  billingService = inject(BillingService);

invoiceColumns = [
  { label: 'Nº Factura', key: 'invoiceNumber' },
  { label: 'Cliente', key: 'clientName' },
  { label: 'Fecha', key: 'date', type: 'date'  },
  { label: 'Total', key: 'total', type: 'currency' },
  { label: 'Método de Pago', key: 'paymentMethod' },
];

ngOnInit() {
  this.loadInvoices();
  this.loadCards();
}

loadInvoices() {
  this.billingService.getInvoiceByDate(this.date()).subscribe({
    next: (invoices) => {
      this.invoices.set(invoices);
    },
    error: (err) => {
      sweetalert2.fire('Error', 'No se pudieron cargar las facturas, ' + err.message, 'error');
    }
  });
}

loadCards() {
  this.billingService.getBillingStats(this.date()).subscribe({
    next: (stats) => {
      this.incomesPerDay.set(stats.incomesPerDay);
      this.emittedBills.set(stats.emittedBills);
    },
    error: (err) => {
      sweetalert2.fire('Error', 'No se pudieron cargar las estadísticas, ' + err.message, 'error');
    }
  }); 
}

  onDateChange(newDate: string) {
    this.date.set(newDate);
    this.loadInvoices();
    this.loadCards();
  }

  exportPdf(invoice: invoiceResponse) {
    this.billingService.exportPdf(invoice.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Factura_${invoice.invoiceNumber}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        sweetalert2.fire('Error', 'No se pudo exportar la factura, ' + err.message, 'error');
      }
    }); 
  }


  downloadInvoice(invoiceId: string) {
    // Aquí iría la lógica para descargar la factura, por ejemplo:
    console.log(`Descargando factura ${invoiceId}`);
    
  }
  viewInvoice(invoiceId: string) {
    // Aquí iría la lógica para ver la factura, por ejemplo:
    console.log(`Viendo factura ${invoiceId}`);
    // Puedes abrir un modal o redirigir a una página de detalles 
  }
}
