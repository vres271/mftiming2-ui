import { User } from './../components/users/users.component';
import { APIService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: APIService) { }

  getUsers():Observable<User[]> {
    return this.apiService.get('users')
  }

  createUser(newUser:User):Observable<User> {
    return this.apiService.post('users', newUser)
  }

}
