import { APIService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService:APIService) { }

  login(authData:{username:string,password:string}):Observable<any> {
    return this.apiService.post('auth/login',authData)
  }
}
