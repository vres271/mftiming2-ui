import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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
  public access_token:string;

  constructor(private http: HttpClient) {}

  get(entityName:string):Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    if(this.access_token) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer '+this.access_token);
    }
    return this.http.get(this.apiURL+entityName, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  post(entityName:string, data:any):Observable<any> {
    return this.http.post(this.apiURL+entityName, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  delete(entityName:string, id:number):Observable<any> {
    return this.http.delete(`${this.apiURL}${entityName}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  patch(entityName:string, id:number, data:any):Observable<any> {
    return this.http.patch(`${this.apiURL}${entityName}/${id}`, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(error);
    // return throwError(() => new Error('Something bad happened; please try again later.'));
  }  
}
