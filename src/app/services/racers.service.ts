import { ItemsService } from './common/items.service';
import { affectedResponse } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Racer {
  id: number
  userId: number
  raceId: number
  categoryId: number
  app: any
  get userFullName():string {
    return this.app?.services?.usersService?.map?.id[this.userId]?.fullName||''
  }
  get raceName():string {
    return this.app?.services?.racesService?.map?.id[this.raceId]?.name||''
  }
  get categoryName():string {
    return this.app?.services?.categoriesService?.map?.id[this.categoryId]?.name||''
  }
  toString() {return this.id}
  constructor(item?:any) {
    if(item) {
      this.id = item.id
      this.userId = item.userId
      this.raceId = item.raceId
      this.categoryId = item.categoryId
    }
  }
}

export class RacerDTO {
  // user: {id:number}
  // race: {id:number}
  userId: number
  raceId: number
  categoryId: number
  constructor(item?:Racer) {
    if(item) {
      // this.user = {id:item.userId}
      // this.race = {id:item.raceId}
      this.userId = item.userId
      this.raceId = item.raceId
      this.categoryId = item.categoryId

    }
  }
}

export class CreateRacerDto  extends RacerDTO{}
export class UpdateRacerDto extends CreateRacerDto {}

@Injectable({
  providedIn: 'root'
})
export class RacersService extends ItemsService{
  override entityName = 'racers'
  override items:Racer[] = []
  override itemClass = Racer
  override createItemDtoClass = CreateRacerDto
  override updateItemDtoClass = UpdateRacerDto
  getRacers(params?:{force?:boolean}):Observable<Racer[]> {return this.getItems(params) as Observable<Racer[]>}
  createRacer(newItem:Racer):Observable<any> {return this.createItem(newItem) as Observable<any>}
  deleteRacer(itemId:number):Observable<affectedResponse> {return this.deleteItem(itemId) as Observable<affectedResponse>}
  updateRacer(updatingItem:Racer, itemId:number):Observable<affectedResponse> {return this.updateItem(updatingItem, itemId) as Observable<affectedResponse>}
}

