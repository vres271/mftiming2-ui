import { SeasonsService } from './services/seasons.service';
import { RacesService } from './services/races.service';
import { RacersService } from './services/racers.service';
import { filter, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { APPService } from './services/app.service';
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from './services/auth.service';
import { forkJoin } from 'rxjs';

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
    public racesService: RacesService,
    public racersService: RacersService,
    public seasonsService: SeasonsService,
    ) {}

  ngOnInit(): void {
    this.appService.services = {
      usersService: this.usersService,
      categoriesService: this.categoriesService,
      racesService: this.racesService,
      racersService: this.racersService,
      seasonsService: this.seasonsService,
    }
    
    this.authService.authSubj$
      .pipe(
        filter(state=>state.auth===true),
        switchMap(res=>forkJoin({
          users: this.usersService.getUsers(),
          categories: this.categoriesService.getCategories(),
          races: this.racesService.getRaces(),
          racers: this.racersService.getRacers(),
          seasons: this.seasonsService.getSeasons(),
        }))
      )
      .subscribe();

      // this.appService.init$.next(true)    
      // this.appService.init$.complete()
  }
  
  title = 'mftiming2-ui';
  menuItems: MenuItem[] = [
    {label: 'Home', icon: 'pi pi-fw pi-home', routerLink:"/"},
    {label: 'Users', icon: 'pi pi-fw pi-user', routerLink:"/users"},
    {label: 'Racers', icon: 'pi pi-fw pi-link', routerLink:"/racers"},
    {label: 'Races', icon: 'pi pi-fw pi-clock', routerLink:"/races"},
    {label: 'Categories', icon: 'pi pi-fw pi-users', routerLink:"/categories"},
    {label: 'Seasons', icon: 'pi pi-fw pi-calendar', routerLink:"/seasons"},
    {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink:"/tree"},
  ];

  logOut() {
    this.authService.logOut()
      .subscribe()
  }

}
