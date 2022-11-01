import { ItemsService } from './common/items.service';
import { map, tap } from 'rxjs/operators';
import { APIService, affectedResponse } from './api.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class User {
  id: number
  login: string
  password?: string
  firstName: string
  secondName: string
  thirdName: string
  roles: Role[]
  isActive: boolean  
  birthDate: Date|null
  constructor(item?:any) {
    if(item) {
      this.id = item.id
      this.login = item.login
      if(item.password) this.password = item.password
      if(item.firstName!==undefined) this.firstName = item.firstName
      if(item.secondName!==undefined) this.secondName = item.secondName
      if(item.thirdName!==undefined) this.thirdName = item.thirdName
      if(item.roles!==undefined) {
        if(typeof item.birthDate === 'string') {
          this.roles = item.roles.split(',').filter((role:any)=>role)
        } else {
          this.roles = item.roles
        }
      }
      if(item.isActive!==undefined) this.isActive = item.isActive
      if(item.birthDate!==undefined) {
        if(typeof item.birthDate === 'string') {
          this.birthDate = new Date(item.birthDate+'T00:00:00.000')
        } else {
          this.birthDate = item.birthDate
        }
        
      }
    }
  }
}

export class UserDTO {
  login: string
  password?: string
  firstName: string = ''
  secondName: string = ''
  thirdName: string = ''
  roles: string = ''
  isActive: boolean  = false; 
  birthDate: string|null
  constructor(item?:User) {
    if(item) {
      this.login = item.login
      if(item.password) this.password = item.password
      if(item.firstName!==undefined) this.firstName = item.firstName
      if(item.secondName!==undefined) this.secondName = item.secondName
      if(item.thirdName!==undefined) this.thirdName = item.thirdName
      if(item.roles) this.roles = item.roles.join(',')
      if(item.isActive!==undefined) this.isActive = item.isActive
      if(item.birthDate) {
        let dateArray = item.birthDate.toLocaleString().split(',')[0].split('.')
        this.birthDate = dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0]
      } else {
        this.birthDate = item.birthDate
      }
    }
  }
}

export class CreateUserDto  extends UserDTO{}
export class UpdateUserDto extends CreateUserDto {}

interface Role {
  name: string,
  code: string
}

export const userRoles:Role[] = [
  {name:'Admin',code:'admin'},
  {name:'User',code:'user'},
];


@Injectable({
  providedIn: 'root'
})
export class UsersService extends ItemsService{
  override entityName = 'users'
  override items:User[] = []
  override itemClass = User
  override createItemDtoClass = CreateUserDto
  override updateItemDtoClass = UpdateUserDto
  override afterCreate(user:User):User {
    if(user.password) delete user.password;
    return user;
  }
  override afterUpdate(user:User):User {
    if(user.password) delete user.password;
    return user;
  }
  getUsers(params?:{force?:boolean}):Observable<User[]> {return this.getItems(params) as Observable<User[]>}
  createUser(newItem:User):Observable<any> {return this.createItem(newItem) as Observable<any>}
  deleteUser(itemId:number):Observable<affectedResponse> {return this.deleteItem(itemId) as Observable<affectedResponse>}
  updateUser(updatingItem:User, itemId:number):Observable<affectedResponse> {return this.updateItem(updatingItem, itemId) as Observable<affectedResponse>}
}

