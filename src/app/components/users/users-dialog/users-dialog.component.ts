import { User, userRoles } from './../../../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent implements OnInit {
  @Output() onItemSave = new EventEmitter<User>()
  isOpened: boolean = false
  userId: number|null = null;

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
  roles = userRoles

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  private createForm() {
    this.itemsForm = this.fb.group({
        login: [this.defaults.login, [Validators.required]],
        password: [this.defaults.password],
        firstName: [this.defaults.firstName, [Validators.required]],
        secondName: [this.defaults.secondName],
        thirdName: [this.defaults.thirdName],
        roles: [this.defaults.roles],
        birthDate: [this.defaults.birthDate],
        isActive: [this.defaults.isActive],
    });
}

openDialog(user?: User) {
  this.itemsForm.reset(this.defaults)
  if(!user) {
    this.userId = null
    this.itemsForm.get('password')?.setValidators([Validators.required])        
  } else {
    this.userId = user.id
    this.itemsForm.patchValue({
        ...user, 
        roles: user.roles.split(',').filter(role=>role),
    });   
    this.itemsForm.get('password')?.clearValidators()  
  }
  this.isOpened = true;
}

hideDialog() {
  this.itemsForm.reset(this.defaults)
  this.isOpened = false;
}

saveUser() {
  const user = new User({
    ...this.itemsForm.value,
    roles: this.itemsForm.value.roles.length ? this.itemsForm.value.roles.join(',') : '',
  });
  this.onItemSave.emit(user)
  this.hideDialog()
}

}
