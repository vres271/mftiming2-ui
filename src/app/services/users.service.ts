import { User } from './../components/users/users.component';
import { APIService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private entityName = 'users'
  constructor(private apiService: APIService) { }

  getUsers():Observable<User[]> {
    return this.apiService.get(this.entityName)
  }

  createUser(newUser:User):Observable<User> {
    return this.apiService.post(this.entityName, newUser)
  }

  deleteUser(userId:number):Observable<User> {
    return this.apiService.delete(this.entityName, userId)
  }

  updateUser(updatingUser:User):Observable<User> {
    return this.apiService.patch(this.entityName, updatingUser.id, updatingUser)
  }

}
