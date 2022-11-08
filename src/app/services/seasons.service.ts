import { ItemsService } from './common/items.service';
import { affectedResponse } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Season {
  id: number
  name: string
  app: any
  toString() {return this.name}
  constructor(item?:any) {
    if(item) {
      this.id = item.id
      this.name = item.name
    }
  }
}

export class SeasonDTO {
  name: string
  constructor(item?:Season) {
    if(item) {
      this.name = item.name
    }
  }
}

export class CreateSeasonDto  extends SeasonDTO{}
export class UpdateSeasonDto extends CreateSeasonDto {}

@Injectable({
  providedIn: 'root'
})
export class SeasonsService extends ItemsService{
  override entityName = 'seasons'
  override items:Season[] = []
  override itemClass = Season
  override createItemDtoClass = CreateSeasonDto
  override updateItemDtoClass = UpdateSeasonDto
  getSeasons(params?:{force?:boolean}):Observable<Season[]> {return this.getItems(params) as Observable<Season[]>}
  createSeason(newItem:Season):Observable<any> {return this.createItem(newItem) as Observable<any>}
  deleteSeason(itemId:number):Observable<affectedResponse> {return this.deleteItem(itemId) as Observable<affectedResponse>}
  updateSeason(updatingItem:Season, itemId:number):Observable<affectedResponse> {return this.updateItem(updatingItem, itemId) as Observable<affectedResponse>}
}

