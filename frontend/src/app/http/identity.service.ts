import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Identity } from '../models/identity';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  
  constructor(private _http: HttpClient) { }


  createIdentityService(identity: Identity): Observable<String> {
    return this._http.post<String>(`${environment.baseURL}/identity`, identity)
  }
  // ! check if its a post method
  getIdentitiesService(): Observable<Identity[]> {
    return this._http.get<Identity[]>(`${environment.baseURL}/identity`)
  }
  getIdentityByIdOrUserService(id: String): Observable<Identity>{
    return this._http.get<Identity>(`${environment.baseURL}/identity/${id}`)
  }
  updateIdentityService(id: String, identity: Identity): Observable<String> {
    return this._http.patch<String>(`${environment.baseURL}/identity/${id}`, identity)
  }
  


}
