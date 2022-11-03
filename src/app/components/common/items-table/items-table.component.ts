import { Item } from './../../../services/common/items.service';
import { ConfirmationService } from 'primeng/api';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss'],
  providers: [ConfirmationService]

})
export class ItemsTableComponent implements OnInit {
  @Input() tableOptions:{
      itemsService: any,
      globalFilterFields: string[],
      cols: {
        name:string,
        view?:string,
        type?:string,
        func?:Function,
      }[]
  }
  @Output() onNew = new EventEmitter()
  @Output() onEdit = new EventEmitter<any>()
  @Output() onDelete = new EventEmitter<any>()
  @Output() onDeleteSelected = new EventEmitter<{items: any[], callback:Function}>()
  @Output() onRefresh = new EventEmitter()

  selectedItems: Item[];

  constructor(
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
  }

  newItem() {
    this.onNew.emit()
  }

  editItem(item:Item) {
    this.onEdit.emit(item)
  }

  deleteItem(item:Item) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + item + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.onDelete.emit(item)
        }
    });
  }

  deleteSelectedItems(items:Item[]) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteSelected.emit({items,callback:()=>{this.selectedItems=[]}})
      }
    });
  }

  refreshItems() {
    this.onRefresh.emit()
  }

}
