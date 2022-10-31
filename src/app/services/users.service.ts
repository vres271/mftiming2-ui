import { map, tap } from 'rxjs/operators';
import { APIService } from './api.service';
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
        if(typeof item.roles === 'string') {
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
      if(item.roles) this.roles = item.roles.filter((role:any)=>role).join(',')
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

export class Item  extends User{}


export class itemsService {
  entityName = 'items'
  itemTypeClass = Item
  item:Item
  items:(typeof this.item)[] = []
  constructor(public apiService: APIService) { }

  getUsers(params?:{force?:boolean}):Observable<(typeof this.item)[]> {
    if(this.items.length && !params?.force) return of(this.items)
    return this.apiService.get(this.entityName)
      .pipe(
        map((items:(typeof this.item)[])=>{
          this.items = items.map(item=>new (this.itemTypeClass)(item))
          return this.items
        })
      )
  }

  getUser():Observable<(typeof this.item)> {
    return this.apiService.get(this.entityName+'/8')
  }

  createUser(newUser:(typeof this.item)):Observable<(typeof this.item)> {
    return this.apiService.post(this.entityName, new CreateUserDto(newUser))
      .pipe(
        tap(res=>{
          const createdUser = new (this.itemTypeClass)(res);
          if(createdUser.password) delete createdUser.password;
          this.items.push(createdUser);
        })
      )
  }

  deleteUser(userId:number):Observable<(typeof this.item)> {
    return this.apiService.delete(this.entityName, userId)
      .pipe(
        tap(res=>{
          this.items = this.items.filter(item => item.id !== userId);          
        })
      )
  }

  updateUser(updatingUser:(typeof this.item), userId:number):Observable<(typeof this.item)> {
    return this.apiService.patch(this.entityName, userId, new UpdateUserDto(updatingUser))
      .pipe(
        tap(_=>{
          updatingUser.id = userId
          if(updatingUser.password) delete updatingUser.password;
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

@Injectable({
  providedIn: 'root'
})
export class UsersService extends itemsService{
  override entityName = 'users'
  override item:User
  override itemTypeClass = User
  constructor(override apiService: APIService) {
    super(apiService)
  }
}
