// import { Observable } from 'rxjs';
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

    constructor(private userService: UsersService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.userService.getUsers().subscribe(data => this.users = data);

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
                this.users = this.users.filter(val => val.id !== user.id);
                this.user = new User;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        // if (this.user.login.trim()) {
        //     if (this.user.id) {
        //         this.users[this.findIndexById(this.user.id)] = this.user;
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
        //     }
        //     else {
        //         this.user.id = this.createId();
        //         this.user.image = 'user-placeholder.svg';
        //         this.users.push(this.user);
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
        //     }

        //     this.users = [...this.users];
        //     this.userDialog = false;
        //     this.user = {};
        // }
    }

    findIndexById(id: string): number {
        let index = -1;
        // for (let i = 0; i < this.users.length; i++) {
        //     if (this.users[i].id === id) {
        //         index = i;
        //         break;
        //     }
        // }

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
