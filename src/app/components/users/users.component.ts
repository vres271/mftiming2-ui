import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
// import { Observable, throwError } from 'rxjs';
// import { UsersService } from './../../services/users.service';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.scss']
// })
// export class UsersComponent implements OnInit {

//   items:Observable<any>
//   constructor(public usersService: UsersService) { }

//   ngOnInit(): void {
//     this.items = this.usersService.get();
//   }

// }


import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';

export class User {
  id: number
  login: string
  firstName: string
  secondName: string
  thirdName: string
  isActive: boolean   
}

@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .user-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    providers: [MessageService,ConfirmationService]
})
export class UsersComponent implements OnInit {

    userDialog: boolean;
    users: User[];
    user: User;
    selectedUsers: User[];
    submitted: boolean;
    statuses: any[];

    constructor(private usersService: UsersService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.usersService.getUsers().subscribe(data => this.users = data);

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }

    openNew() {
        this.user = new User;
        this.submitted = false;
        this.userDialog = true;
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

    editUser(user: User) {
        this.user = {...user};
        this.userDialog = true;
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
                    console.log(res)
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
                    this.users = this.users.filter(val => val.id !== user.id);
                  })


            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }


    saveUser() {
        this.submitted = true;
        
        if (this.user.login.trim()) {
            if (this.user.id) {
                let updatedUser = this.user
                this.usersService.updateUser(updatedUser)
                    .pipe(
                        catchError(this.errorHandler)
                    )
                    .subscribe(res => {
                        this.users[this.findIndexById(String(updatedUser.id))] = updatedUser;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                    })             
            } else {
                this.usersService.createUser(this.user)
                  .pipe(
                    catchError(this.errorHandler)
                  )
                  .subscribe(res=>{
                    let createdUser = new User;
                    createdUser.id = res.id
                    createdUser.login = res.login
                    createdUser.firstName = res.firstName
                    createdUser.secondName = res.secondName
                    createdUser.thirdName = res.thirdName
                    createdUser.isActive = res.isActive
                
                    this.users.push(createdUser);
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
                  })
            }

            this.users = [...this.users];
            this.userDialog = false;
            this.user = new User;
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
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === +id) {
                index = i;
                break;
            }
        }
        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
