import { first, last, map } from 'rxjs/operators';
import { Item } from './../../../services/common/items.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})

export class ItemDialogComponent implements OnInit, OnDestroy {
  @Output() onItemSave = new EventEmitter<any>()
  @Input() dialogOptions:{
    itemsService: any,
    fields: {
      name:string,
      validators?:any[],
      type?:string,
      default?:any,
      items$?:any,
      _items?:any,
      optionValue?:string,
      optionLabel?:string,
    }[]
  }
  isOpened: boolean = false
  itemId: number | null = null;
  subscriptions: Subscription[] = [];

  itemsForm: FormGroup
  defaults:any = {}

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    let formItems:any = {}
    this.dialogOptions.fields.forEach(field=>{
      if(field.items$) {
        this.subscriptions.push(
          field.items$
          .pipe(
            map((items:any)=>{return items}),
          )
          .subscribe((items:any)=>{
            field._items = items
          })
        ) 
      }
      this.defaults[field.name] = field.default!==undefined?field.default:null
      let formControll = [field.default]
      if(field.validators) formControll.push(field.validators)
      formItems[field.name] = formControll
    })
    this.itemsForm = this.fb.group(formItems)
  }

  openDialog(item?: Item) {
    this.itemsForm.reset(this.defaults)
    if (!item) {
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
    const item = this.dialogOptions.itemsService.newItem(this.itemsForm.value);
    this.onItemSave.emit(item)
    this.hideDialog()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
}

}
