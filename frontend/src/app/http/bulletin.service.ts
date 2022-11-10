import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bulletin } from '../models/bulletin';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {

  constructor(private _http: HttpClient) { }


  createBulletinService(data: Bulletin): Observable<String>{
    return this._http.post<String>(`${environment.baseURL}/bulletin`, {data})
  }
  getBulletinsService(): Observable<Bulletin[]> {
    return this._http.get<Bulletin[]>(`${environment.baseURL}/bulletin`)
  }
  getBulletinByIdService(id: String): Observable<Bulletin>{
    return this._http.get<Bulletin>(`${environment.baseURL}/bulletin/${id}`)
  }
  updateBulletinService(id: String, data: string) : Observable<String> {
    return this._http.patch<String>(`${environment.baseURL}/bulletin/${id}`, {status:data})
  }
}
