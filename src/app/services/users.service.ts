import { map, tap } from 'rxjs/operators';
import { APIService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class User {
  id: number
  login: string
  password: string
  firstName: string
  secondName: string
  thirdName: string
  _roles: string
  isActive: boolean  
  constructor(item?:any) {
    if(item) {
      this.id = item.id
      this.login = item.login
      if(item.password!==undefined) this.password = item.password
      if(item.firstName!==undefined) this.firstName = item.firstName
      if(item.secondName!==undefined) this.secondName = item.secondName
      if(item.thirdName!==undefined) this.thirdName = item.thirdName
      if(item._roles!==undefined) this._roles = item._roles
      if(item.isActive!==undefined) this.isActive = item.isActive
    }
  }
}

export class UserDTO {
  login: string
  password: string = ''
  firstName: string = ''
  secondName: string = ''
  thirdName: string = ''
  _roles: string = ''
  isActive: boolean  = false; 
  constructor(item?:User) {
    if(item) {
      this.login = item.login
      if(item.password!==undefined) this.password = item.password
      if(item.firstName!==undefined) this.firstName = item.firstName
      if(item.secondName!==undefined) this.secondName = item.secondName
      if(item.thirdName!==undefined) this.thirdName = item.thirdName
      if(item._roles!==undefined) this._roles = item._roles
      if(item.isActive!==undefined) this.isActive = item.isActive
    }
  }
}

export class CreateUserDto  extends UserDTO{}
export class UpdateUserDto extends CreateUserDto {}


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private entityName = 'users'
  items:User[] = []
  constructor(private apiService: APIService) { }

  getUsers(params?:{force?:boolean}):Observable<User[]> {
    if(this.items.length && !params?.force) return of(this.items)
    return this.apiService.get(this.entityName)
      .pipe(
        map((items:User[])=>{
          this.items = items
          return this.items
        })
      )
  }

  getUser():Observable<User> {
    return this.apiService.get(this.entityName+'/8')
  }

  createUser(newUser:User):Observable<User> {
    return this.apiService.post(this.entityName, new CreateUserDto(newUser))
      .pipe(
        tap(res=>{
          const createdUser = new User(res);
          this.items.push(createdUser);
        })
      )
  }

  deleteUser(userId:number):Observable<User> {
    return this.apiService.delete(this.entityName, userId)
      .pipe(
        tap(res=>{
          this.items = this.items.filter(item => item.id !== userId);          
        })
      )
  }

  updateUser(updatingUser:User, userId:number):Observable<User> {
    return this.apiService.patch(this.entityName, userId, new UpdateUserDto(updatingUser))
      .pipe(
        tap(_=>{
          this.items[this.findIndexById(String(userId))] = updatingUser;
        })
      )
    
  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id === +id) {
            index = i;
            break;
        }
    }
    return index;
}



}
