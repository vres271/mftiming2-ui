import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { APIService } from './api.service';
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './users.service';

export class authDTO {
  auth?:boolean
  access_token?:string
  user:User
} 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: boolean|null = null
  public user: User|null = null;
  public authSubj:ReplaySubject<boolean> = new ReplaySubject()

  constructor(
    private apiService:APIService,
    private router: Router,
  ) {
    const savedAccessToken = sessionStorage.getItem('access_token')
    if(savedAccessToken) {
      this.apiService.setAccessToken(savedAccessToken)
      this.auth()
        .pipe(catchError((error: HttpErrorResponse)=>of(null)))
        .subscribe(res=>{
          this.authSubj.next(!!res?.auth)
        })
    }
  }

  getIsAut() {
    return this.isAuth===null?this.authSubj:of(this.isAuth)
  }

  private setAuth(authItem:authDTO):boolean {
    this.isAuth = authItem.auth||authItem.access_token!==''
    this.user = new User(authItem.user)
    if(authItem.access_token) this.apiService.setAccessToken(authItem.access_token)
    return this.isAuth
  }

  private unsetAuth():boolean {
    this.isAuth = false
    this.user = null
    this.apiService.clearAccessToken()
    return !this.isAuth
  }

  auth():Observable<any> {
    return this.apiService.get('auth/me')
      .pipe(
        tap((res:authDTO)=>{
        if(res.auth && res.user) {
          this.setAuth(res)
        } else {
          this.unsetAuth()
          sessionStorage.removeItem('access_token')
        }
      }))
  }

  login(authData:{username:string,password:string}):Observable<any> {
    this.unsetAuth()
    return this.apiService.post('auth/login',authData)
      .pipe(tap((res:authDTO)=>{
        if(res.access_token) {
          this.setAuth(res)
          sessionStorage.setItem('access_token',res.access_token)
        }
      }))
  }

  logOut() {
    return this.apiService.post('auth/logout',{})
      .pipe(tap(()=>{
          this.unsetAuth()
          sessionStorage.removeItem('access_token')
          this.router.navigate(['/' ]);
      }))
  }

}
