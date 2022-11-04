import { mergeMap } from 'rxjs/operators';
import { CategoriesService } from './categories.service';
import { UsersService } from './users.service';
import { ItemsService } from './common/items.service';
import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APPService {
  init$ = new AsyncSubject();
  services: any
  constructor() { 
    this.init$
      .subscribe(res=>{console.log('init$ fired in APPService')})
  }


    
}
