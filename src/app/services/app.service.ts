import { CategoriesService } from './categories.service';
import { UsersService } from './users.service';
import { ItemsService } from './common/items.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APPService {
  services: any
  constructor(
    // public usersService: UsersService,
    // public categoriesService: CategoriesService,
    ) { }
}
