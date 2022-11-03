import { ItemsService } from './common/items.service';
import { affectedResponse } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Category {
  id: number
  name: string
  ageFrom: number|null
  ageTo: number|null
  app: any
  toString() {return this.name}
  constructor(item?:any) {
    if(item) {
      this.id = item.id
      this.name = item.name
      if(item.ageFrom!==undefined) this.ageFrom = (item.ageFrom===null||item.ageFrom==='')?null:1*item.ageFrom
      if(item.ageTo!==undefined) this.ageTo = (item.ageTo===null||item.ageTo==='')?null:1*item.ageTo
    }
  }
}

export class CategoryDTO {
  login: string
  name: string
  ageFrom: number|null
  ageTo: number|null
  constructor(item?:Category) {
    if(item) {
      this.name = item.name
      if(item.ageFrom!==undefined) this.ageFrom = (item.ageFrom===null)?null:1*item.ageFrom
      if(item.ageTo!==undefined) this.ageTo = (item.ageTo===null)?null:1*item.ageTo
    }
  }
}

export class CreateCategoryDto  extends CategoryDTO{}
export class UpdateCategoryDto extends CreateCategoryDto {}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ItemsService{
  override entityName = 'categories'
  override items:Category[] = []
  override itemClass = Category
  override createItemDtoClass = CreateCategoryDto
  override updateItemDtoClass = UpdateCategoryDto
  getCategories(params?:{force?:boolean}):Observable<Category[]> {return this.getItems(params) as Observable<Category[]>}
  createCategory(newItem:Category):Observable<any> {return this.createItem(newItem) as Observable<any>}
  deleteCategory(itemId:number):Observable<affectedResponse> {return this.deleteItem(itemId) as Observable<affectedResponse>}
  updateCategory(updatingItem:Category, itemId:number):Observable<affectedResponse> {return this.updateItem(updatingItem, itemId) as Observable<affectedResponse>}
}

