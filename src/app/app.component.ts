import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    ) {}
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
