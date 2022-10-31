import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Component, OnInit, ViewChild , } from '@angular/core';
import { UsersService, User } from './../../services/users.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {  of } from 'rxjs';


@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    providers: [MessageService,ConfirmationService]
})
export class UsersComponent implements OnInit  {
    users: User[];
    userId: number|null = null;
    selectedUsers: User[];
    @ViewChild(UsersDialogComponent) 
    private usersDialogComponent: UsersDialogComponent

    constructor(
        public usersService: UsersService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
    ) {}
 
    ngOnInit() {
        this.usersService.getUsers()
            .subscribe();
    }

    openDialog(user?: User) {
        this.userId = user?user.id:null
        this.usersDialogComponent.openDialog(user)
    }

    saveUser(user: User) { 
        (!this.userId?this.usersService.createUser(user):this.usersService.updateUser(user, this.userId))
            .pipe(catchError(this.errorHandler))
            .subscribe(res=>{if(res) this.successMessage(this.userId?'User Updated':'User Created')})
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
                this.successMessage('Users Deleted')
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
                  .pipe(catchError(this.errorHandler))
                  .subscribe(res=>this.successMessage('User Deleted'))
            }
        });
    }


    private successMessage(detail:string) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail, life: 3000 });
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
    }


}
