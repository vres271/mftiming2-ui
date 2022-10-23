import { UsersService } from './../../services/users.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login:string = 'vres271' 
  password:string = '123'

  constructor(private authService: AuthService, private usersService:UsersService) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.login({username:this.login,password:this.password})
      .subscribe()
  }
  
}
