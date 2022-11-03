import { Validators } from '@angular/forms';
import { Item } from './../../services/common/items.service';
import { ItemDialogComponent } from './../common/item-dialog/item-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Component, OnInit, ViewChild , } from '@angular/core';
import { CategoriesService, Category } from './../../services/categories.service';
import { MessageService } from 'primeng/api';
import {  of } from 'rxjs';


@Component({
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    providers: [MessageService]
})
export class CategoriesComponent implements OnInit  {
    categories: Category[];
    categoryId: number|null = null;
    @ViewChild(ItemDialogComponent) 
    private itemsDialogComponent: ItemDialogComponent

    tableOptions={
        itemsService: this.categoriesService,
        globalFilterFields: ['name'],
        cols: [
            {name:'name'},
            {name:'ageFrom'},
            {name:'ageTo'},
        ]
    }

    dialogOptions={
        itemsService: this.categoriesService,
        fields: [
            {name:'name', default:'', validators: [Validators.required]},
            {name:'ageFrom', default:null},
            {name:'ageTo', default:null},
        ]
    }

    constructor(
        public categoriesService: CategoriesService, 
        private messageService: MessageService, 
    ) {}
 
    ngOnInit() {
        this.categoriesService.getCategories()
            .subscribe();
    }

    openDialog(category?: Item) {
        this.categoryId = category?category.id:null
        this.itemsDialogComponent.openDialog(category)
    }

    saveCategory(category: Category) { 
        (!this.categoryId?this.categoriesService.createCategory(category):this.categoriesService.updateCategory(category, this.categoryId))
            .pipe(catchError(this.errorHandler))
            .subscribe(res=>{if(res) this.successMessage(this.categoryId?'Category Updated':'Category Created')})
    }

    refreshCategories() {
      this.categoriesService.getCategories({force:true})
        .pipe(
          catchError(this.errorHandler)
        )
        .subscribe();
    }

    deleteSelectedCategories(selObject:{items: Category[], callback:Function}) {
        // this.categories = this.categories.filter(val => !this.selectedItems?.includes(val));
        console.log(selObject.items)
        selObject.callback()
        this.successMessage('Categories Deleted')
    }

    deleteCategory(category: Category) {
        this.categoriesService.deleteCategory(category.id)
            .pipe(catchError(this.errorHandler))
            .subscribe(res=>this.successMessage('Category Deleted'))

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
