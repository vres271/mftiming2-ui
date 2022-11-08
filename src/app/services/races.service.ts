import { ItemsService } from './common/items.service';
import { affectedResponse } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Race {
  id: number
  name: string
  start: number|null
  end: number|null
  seasonId: number
  app: any
  get seasonName():string {
    return this.app?.services?.seasonsService?.map?.id[this.seasonId]?.name||''
  }
  toString() {return this.name}
  constructor(item?:any) {
    if(item) {
      this.id = item.id
      this.name = item.name
      if(item.start!==undefined) this.start = (item.start===null||item.start==='')?null:1*item.start
      if(item.end!==undefined) this.end = (item.end===null||item.end==='')?null:1*item.end
      if(item.seasonId!==undefined) this.seasonId = 1*item.seasonId
    }
  }
}

export class RaceDTO {
  login: string
  name: string
  start: number|null
  end: number|null
  seasonId: number
  constructor(item?:Race) {
    if(item) {
      this.name = item.name
      if(item.start!==undefined) this.start = (item.start===null)?null:1*item.start
      if(item.end!==undefined) this.end = (item.end===null)?null:1*item.end
      if(item.seasonId!==undefined) this.seasonId = 1*item.seasonId
    }
  }
}

export class CreateRaceDto  extends RaceDTO{}
export class UpdateRaceDto extends CreateRaceDto {}

@Injectable({
  providedIn: 'root'
})
export class RacesService extends ItemsService{
  override entityName = 'races'
  override items:Race[] = []
  override itemClass = Race
  override createItemDtoClass = CreateRaceDto
  override updateItemDtoClass = UpdateRaceDto
  getRaces(params?:{force?:boolean}):Observable<Race[]> {return this.getItems(params) as Observable<Race[]>}
  createRace(newItem:Race):Observable<any> {return this.createItem(newItem) as Observable<any>}
  deleteRace(itemId:number):Observable<affectedResponse> {return this.deleteItem(itemId) as Observable<affectedResponse>}
  updateRace(updatingItem:Race, itemId:number):Observable<affectedResponse> {return this.updateItem(updatingItem, itemId) as Observable<affectedResponse>}
}

