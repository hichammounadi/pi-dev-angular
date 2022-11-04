import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser, RegisterUser, TokenUser, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }



  loginUserService(loginUser: LoginUser): Observable<TokenUser>{
    return this._http.post<TokenUser>(`${environment.baseURL}/auth/login`, loginUser)
  }
  registerUserService(registerUser: RegisterUser): Observable<String> {
    return this._http.post<String>(`${environment.baseURL}/auth/register`, registerUser)
  }
  logoutUserService() : Observable<String>{
    return this._http.delete<String>(`${environment.baseURL}/auth/logout`)
  }
  getUsersService(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.baseURL}/auth/users`)
  }
  getUserByIdService(id:String): Observable<User>{
    return this._http.get<User> (`${environment.baseURL}/auth/profile/${id}`)
  }
}
