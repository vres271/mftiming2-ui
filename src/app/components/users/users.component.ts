import { Observable } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  items:Observable<any>
  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.items = this.usersService.get();
  }

}
