import { APIService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: APIService) { }

  getUsers():Observable<any> {
    return this.apiService.get('users')
  }

}
