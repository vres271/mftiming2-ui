import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {
  public offlineMode:boolean = false
  private cache: any[]|null = null;

  constructor() {
    setTimeout(()=>{this.offlineMode = true}, 5000)
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    
    const entity = request.url.split('/')[3]
    if(request.method === 'GET') {
      if(entity === 'seasons') {
        if(this.offlineMode) {
          console.log('seasons from cache')
          const myResponse = new HttpResponse({status:200, body:this.cache});
          return of(myResponse)
        }
      }
    }
    return next.handle(request).pipe(
      tap(event => {
        // There may be other events besides the response.
        if (event instanceof HttpResponse) {
          if(request.method === 'GET') {
            if(entity === 'seasons') {
              if(!this.offlineMode) {
                console.log('Write seasons to cache', event.body)
                this.cache = event.body
              }
            }
          }
        }
      })
    );;
  }
}
