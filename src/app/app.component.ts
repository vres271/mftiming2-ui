import { mergeMap } from 'rxjs/operators';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { APPService } from './services/app.service';
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public appService: APPService,
    public usersService: UsersService,
    public categoriesService: CategoriesService,
    ) {}

  ngOnInit(): void {
    this.appService.services = {
      usersService: this.usersService,
      categoriesService: this.categoriesService
    }
    
    this.authService.authSubj$
      .pipe(
        mergeMap(q=>this.usersService.getUsers()),
        mergeMap(q=>this.categoriesService.getCategories()),
      )
      .subscribe();

      // this.appService.init$.next(true)    
      // this.appService.init$.complete()
  }
  
  title = 'mftiming2-ui';
  menuItems: MenuItem[] = [
    {label: 'Home', icon: 'pi pi-fw pi-home', routerLink:"/"},
    {label: 'Users', icon: 'pi pi-fw pi-user', routerLink:"/users"},
    {label: 'Categories', icon: 'pi pi-fw pi-users', routerLink:"/categories"},
  ];

  logOut() {
    this.authService.logOut()
      .subscribe()
  }

}
