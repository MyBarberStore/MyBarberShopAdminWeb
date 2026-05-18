import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { invoiceRequest } from '../../sharedx/models/dto/invoice-request';
import { Observable } from 'rxjs';
import { invoiceResponse } from '../../sharedx/models/dto/invoice-response';
import { billCardsData } from '../../sharedx/models/dto/bill-cards-data';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/invoices';
  createInvoice(invoiceRequest: invoiceRequest):Observable<invoiceResponse> {
    return this.http.post<invoiceResponse>(`${this.apiUrl}`, invoiceRequest);
  }

  deleteInvoice(id: number):Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateInvoice(id: number, invoiceRequest: invoiceRequest):Observable<invoiceResponse> {
    return this.http.put<invoiceResponse>(`${this.apiUrl}/${id}`, invoiceRequest);
  }

  getInvoices(): Observable<invoiceResponse[]> {
    return this.http.get<invoiceResponse[]>(`${this.apiUrl}`);
  }

  getInvoiceById(id: number): Observable<invoiceResponse> {
    return this.http.get<invoiceResponse>(`${this.apiUrl}/${id}`);
  }

  getInvoiceByDate(date: string): Observable<invoiceResponse[]> {
    return this.http.get<invoiceResponse[]>(`${this.apiUrl}/by-date/${date}`);
  }

  exportPdf(id: Number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/export-pdf`, {
      responseType: 'blob'
    });
  }

  getBillingStats(date: string): Observable<billCardsData> {
    return this.http.get<billCardsData>(`${this.apiUrl}/billCards/${date}`);
  }

  downloadReport(month: number, year: number) {
  return this.http.get(`${this.apiUrl}/report/monthly`, {
    params: { month, year },
    responseType: 'blob'
  });
}


  
}
