import { ItemsService } from './common/items.service';
import { affectedResponse } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Racer {
  id: number
  userId: number
  raceId: number
  app: any
  toString() {return this.id}
  constructor(item?:any) {
    if(item) {
      this.id = item.id
      this.userId = item.userId
      this.raceId = item.raceId
    }
  }
}

export class RacerDTO {
  constructor(item?:Racer) {
    if(item) {
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

