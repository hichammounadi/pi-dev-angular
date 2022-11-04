import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _http: HttpClient) { }


  createInvoiceService(data: Invoice): Observable<String> {
    return this._http.post<String>(`${environment.baseURL}/invoice`, {data})
  }
  getInvoicesService() : Observable<Invoice[]>{
    return this._http.get<Invoice[]>(`${environment.baseURL}/invoice`)
  }
  getInvoiceByIdService(id: String): Observable<Invoice>{
    return this._http.get<Invoice>(`${environment.baseURL}/invoice/${id}`)
  }
  updateInvoiceService(id: String, data: Invoice): Observable<String> {
    return this._http.patch<String>(`${environment.baseURL}/invoice/${id}`, {data})
  }
  deleteInvoiceService(id: String): Observable<String>{
    return this._http.delete<String>(`${environment.baseURL}/invoice/${id}`)
  }
}
