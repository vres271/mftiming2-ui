import { tap } from 'rxjs/operators';
import { APIService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private access_token:string
  public isAuth: boolean = false

  constructor(private apiService:APIService) { }

  login(authData:{username:string,password:string}):Observable<any> {
    return this.apiService.post('auth/login',authData)
      .pipe(tap((res:any)=>{
        if(res.access_token) {
          this.access_token = res.access_token;
          this.isAuth = true;
          this.apiService.setAccessToken(this.access_token)
        }
      }))
  }
}
