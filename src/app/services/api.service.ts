import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParamsOptions } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export type affectedResponse = {
  affected:number
  generatedMaps?:any[]
  raw?:any[]
}

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiURL = 'http://localhost:3003/';
  private access_token:string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {}

  setAccessToken(access_token:string) {
    this.access_token = access_token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+this.access_token);
  }

  get(entityName:string):Observable<any> {
    return this.http.get(this.apiURL+entityName, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  post(entityName:string, data:any):Observable<any> {
    return this.http.post(this.apiURL+entityName, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  delete(entityName:string, id?:number):Observable<any> {
    return this.http.delete(`${this.apiURL}${entityName}${id?('/'+id):''}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  patch(entityName:string, id:number, data:any):Observable<any> {
    return this.http.patch(`${this.apiURL}${entityName}/${id}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(error);
    // return throwError(() => new Error('Something bad happened; please try again later.'));
  }  
}
