import { APPService } from './../app.service';
import { CategoriesService } from './../categories.service';
import { APIService } from '../api.service';
import { map, tap, last } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject  } from 'rxjs';

export class Item{
  id: number
  app: any
  constructor(item?:any) {}
}

export class ItemDTO {
  constructor(item?:Item) {
    if(item) {}
  }
}

export class CreateItemDto  extends ItemDTO{}
export class UpdateItemDto extends CreateItemDto {}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  public entityName = 'items'
  items:Item[] = []
  public items$:BehaviorSubject<any> = new BehaviorSubject([])

  itemClass = Item
  createItemDtoClass = CreateItemDto
  updateItemDtoClass = UpdateItemDto

  map:any = {id:{}}

  constructor(
    public apiService: APIService,
    public appService: APPService
    ) { }

  afterGet(item:Item):Item {return item}
  afterCreate(item:Item):Item {return item}
  afterUpdate(item:Item):Item {return item}
  afterDelete(item:Item):Item {return item}

  createMap() {
    this.items.forEach((item:any)=>{
      for(let mapKey in this.map) {
        if(mapKey in item) {
          this.map[mapKey][item[mapKey]] = item
        }
      }
    })
  }

  newItem(itemData?:any) {
    const item = new (this.itemClass)(itemData)
    item.app = this.appService 
    return item
  }

  getItems(params?:{force?:boolean}):Observable<Item[]> {
    if(this.items.length && !params?.force) return of(this.items)
    return this.apiService.get(this.entityName)
      .pipe(
        map((items:Item[])=>{
          this.items = items.map(item=>this.afterGet(this.newItem(item)))
          this.createMap()
          this.items$.next(this.items)
          return this.items
        })
      )
  }

  getItem(itemId:number):Observable<Item> {
    return this.apiService.get(this.entityName+'/'+itemId)
      .pipe(tap(_=>{this.items$.next(this.items)}))
  }

  createItem(newItem:Item):Observable<any> {
    return this.apiService.post(this.entityName, new (this.createItemDtoClass)(newItem))
      .pipe(
        tap((res:any)=>{
          let createdItem = this.newItem(res);
          createdItem = this.afterCreate(createdItem)
          this.items.push(createdItem);
          this.createMap()
          this.items$.next(this.items)
        })
      )
  }

  updateItem(updatingItem:Item, itemId:number):Observable<any> {
    return this.apiService.patch(this.entityName, itemId, new (this.updateItemDtoClass)(updatingItem))
      .pipe(
        tap((res:any)=>{
          updatingItem.id = itemId
          updatingItem = this.afterUpdate(updatingItem)
          this.items[this.findIndexById(String(itemId))] = updatingItem;
          this.items = [...this.items]
          this.createMap()
          this.items$.next(this.items)
        })
      )
  }

  deleteItem(itemId:number):Observable<any> {
    return this.apiService.delete(this.entityName, itemId)
      .pipe(
        tap((res:any)=>{
          this.items = this.items.filter(item => item.id !== itemId);  
          this.createMap()        
          this.items$.next(this.items)
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
