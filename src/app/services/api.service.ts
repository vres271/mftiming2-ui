import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiURL = 'http://localhost:3003/';

  constructor(private http: HttpClient) { }

  get(entityName:string):Observable<any> {
    return this.http.get(this.apiURL+entityName)
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
