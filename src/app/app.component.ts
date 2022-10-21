import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mftiming2-ui';
  menuItems: MenuItem[] = [
    {label: 'Home', icon: 'pi pi-fw pi-home', routerLink:"/"},
    {label: 'Users', icon: 'pi pi-fw pi-user', routerLink:"/users"}
  ];
}
