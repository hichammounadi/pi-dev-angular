import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(private _http: HttpClient) { }

  createCreditService(data: CreditCard): Observable<String> {
    return this._http.post<String>(`${environment.baseURL}/credit-card`, data)
  }
  getCreditsService():Observable<CreditCard[]> {
    return this._http.get<CreditCard[]>(`${environment.baseURL}/credit-card`)
  }
  getCreditByIdService(id: String): Observable<CreditCard> {
    return this._http.get<CreditCard>(`${environment.baseURL}/credit-card/${id}`)
  }
  updateCreditService(id: String, data: CreditCard): Observable<String> {
    return this._http.patch<String>(`${environment.baseURL}/credit-card/${id}`,data)
  }
  // depositMoneyService(id: string, data: CreditCard): Observable<string>{
  //   return this._http.patch<string>(`${environment.baseURL}/credit-card/${id}`, data)
  // }
  deleteCreditService(id: String): Observable<String> {
    return this._http.delete<String>(`${environment.baseURL}/credit-card/${id}`)
  }
}
