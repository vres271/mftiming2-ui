import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { UsersService, User } from './../../services/users.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { throwError, of } from 'rxjs';

interface Role {
    name: string,
    code: string
}

@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    providers: [MessageService,ConfirmationService]
})
export class UsersComponent implements OnInit  {

    users: User[];
    user: User;
    dialogData: {
        roles:string[],
        passwordConfirmation:string,
    } = {roles:[],passwordConfirmation:''}
    selectedUsers: User[];
    userDialog: boolean;
    submitted: boolean;
    roles: Role[] = [
        {name:'Admin',code:'admin'},
        {name:'User',code:'user'},
    ];

    constructor(
        public usersService: UsersService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit() {
        // this.users = this.usersService.items
        this.usersService.getUsers()
            .subscribe(users=>this.users = users);
    }

    openNew() {
        this.user = new User;
        this.submitted = false;
        this.userDialog = true;
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
        this.dialogData.roles = [];
    }

    editUser(user: User) {
        this.user = {...user};
        this.dialogData.roles = this.user.roles.split(',').filter(role=>role)
        this.userDialog = true;
    }

    refreshUsers() {
      this.usersService.getUsers({force:true})
        .pipe(
          catchError(this.errorHandler)
        )
        .subscribe();
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected users?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users = this.users.filter(val => !this.selectedUsers?.includes(val));
                this.selectedUsers = [];
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
            }
        });
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.login + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(user.id)
                  .pipe(
                    catchError(this.errorHandler)
                  )
                  .subscribe(res=>{
                    if(res) this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
                  })
            }
        });
    }

    saveUser() {
        this.submitted = true;
        if (this.user.login.trim()) {
            this.user.roles = this.dialogData.roles.join(',')
            if (this.user.id) {
                this.usersService.updateUser(this.user, this.user.id)
                    .pipe(
                        catchError(this.errorHandler)
                    )
                    .subscribe(res => {
                        if(res) this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                        this.user = new User;
                    })             
            } else {
                this.usersService.createUser(this.user)
                    .pipe(
                        catchError(this.errorHandler)
                    )
                    .subscribe(res => {
                        if(res) this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
                        this.user = new User;
                    })
            }
            this.userDialog = false;
            this.dialogData.roles = [];
        }
    }

    private errorHandler = (error: HttpErrorResponse)=>{
        if (error.status === 0) {
          this.messageService.add({severity:'error', summary: 'An error occurred:', detail: error.error, life: 7000});
        } else if(error.error) {
          this.messageService.add({severity:'error', summary: error.error.statusCode+' : '+error.error.error, detail:error.error.message , life: 7000});
        } else {
          this.messageService.add({severity:'error', summary: `Backend returned code ${error.status}, body was: `, detail: error.error, life: 7000});
        }
        return of(null)
        // return throwError(() => new Error('Something bad happened; please try again later.'));
    }


}
