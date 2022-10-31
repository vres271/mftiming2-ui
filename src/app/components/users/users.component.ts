import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    userId: number|null = null;
    selectedUsers: User[];
    userDialog: boolean;
    roles: Role[] = [
        {name:'Admin',code:'admin'},
        {name:'User',code:'user'},
    ];
    itemsForm: FormGroup
    defaults = {
        login: '',
        password: '',
        firstName: '',
        secondName: '',
        thirdName: '',
        roles: [],
        birthDate: null,
        isActive: '',
    }
    constructor(
        public usersService: UsersService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.usersService.getUsers()
            .subscribe(users=>this.users = users);
        this.createForm()
    }

    private createForm() {
        this.itemsForm = this.fb.group({
            login: [this.defaults.login],
            password: [this.defaults.password],
            firstName: [this.defaults.firstName],
            secondName: [this.defaults.secondName],
            thirdName: [this.defaults.thirdName],
            roles: [this.defaults.roles],
            birthDate: [this.defaults.birthDate],
            isActive: [this.defaults.isActive],
        });
    }

    openNew() {
        this.itemsForm.reset(this.defaults)
        this.userDialog = true;
    }

    hideDialog() {
        this.itemsForm.reset(this.defaults)
        this.userDialog = false;
   }

    editUser(user: User) {
        this.userId = user.id
        this.itemsForm.patchValue({
            ...user, 
            roles: user.roles.split(',').filter(role=>role),
        });   
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

        const user = new User({ 
            ...this.itemsForm.value, 
            roles: this.itemsForm.value.roles.length?this.itemsForm.value.roles.join(','):'',
        })

        if(!this.userId) {
            this.usersService.createUser(user)
                .pipe(catchError(this.errorHandler))
                .subscribe(res => {
                    if(res) this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
                })
        } else {
            this.usersService.updateUser(user, this.userId)
                .pipe(catchError(this.errorHandler))
                .subscribe(res => {
                    if(res) this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                })             
        }
        this.userDialog = false;

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
