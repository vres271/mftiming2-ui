import { Category } from './../../../services/categories.service';
import { Item } from './../../../services/common/items.service';
import { User, userRoles } from './../../../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {
  @Output() onItemSave = new EventEmitter<any>()
  isOpened: boolean = false
  itemId: number|null = null;

  itemsForm: FormGroup
  defaults = {
      name: '',
      ageFrom: null,
      ageTo: null,
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
        name: [this.defaults.name, [Validators.required]],
        ageFrom: [this.defaults.ageFrom],
        ageTo: [this.defaults.ageTo],
    });
}

openDialog(item?: Item) {
  this.itemsForm.reset(this.defaults)
  if(!item) {
    this.itemId = null
  } else {
    this.itemId = item.id
    this.itemsForm.patchValue(item);   
  }
  this.isOpened = true;
}

hideDialog() {
  this.itemsForm.reset(this.defaults)
  this.isOpened = false;
}

saveItem() {
  const item = new Category(this.itemsForm.value);
  this.onItemSave.emit(item)
  this.hideDialog()
}

}
