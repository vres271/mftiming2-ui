import { APIService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: APIService) { }

  get():Observable<any> {
    return this.apiService.get('users')
  }

}
