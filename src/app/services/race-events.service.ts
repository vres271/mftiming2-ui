import { ItemsService } from './common/items.service';
import { affectedResponse } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class RaceEvent {
  id: number
  type: number
  racerId: number
  raceId: number
  app: any

  toString() {return this.id}
  constructor(item?:any) {
    if(item) {
      this.id = item.id
      this.type = item.type
      this.racerId = item.racerId
      this.raceId = item.raceId
    }
  }
}

export class RaceEventDTO {
  type: number
  racerId: number
  raceId: number
  categoryId: number
  constructor(item?:RaceEvent) {
    if(item) {
      this.type = item.type
      this.racerId = item.racerId
      this.raceId = item.raceId
    }
  }
}

export class CreateRaceEventDto  extends RaceEventDTO{}
export class UpdateRaceEventDto extends CreateRaceEventDto {}

@Injectable({
  providedIn: 'root'
})
export class RaceEventsService extends ItemsService{
  override entityName = 'race-events'
  override items:RaceEvent[] = []
  override itemClass = RaceEvent
  override createItemDtoClass = CreateRaceEventDto
  override updateItemDtoClass = UpdateRaceEventDto
  getRaceEvents(params?:{force?:boolean}):Observable<RaceEvent[]> {return this.getItems(params) as Observable<RaceEvent[]>}
  createRaceEvent(newItem:RaceEvent):Observable<any> {return this.createItem(newItem) as Observable<any>}
  deleteRaceEvent(itemId:number):Observable<affectedResponse> {return this.deleteItem(itemId) as Observable<affectedResponse>}
  updateRaceEvent(updatingItem:RaceEvent, itemId:number):Observable<affectedResponse> {return this.updateItem(updatingItem, itemId) as Observable<affectedResponse>}
}

