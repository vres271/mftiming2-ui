import { CategoriesService } from './../../services/categories.service';
import { RacesService } from './../../services/races.service';
import { UsersService } from './../../services/users.service';
import { Validators } from '@angular/forms';
import { Item } from './../../services/common/items.service';
import { ItemDialogComponent } from './../common/item-dialog/item-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, ViewChild , } from '@angular/core';
import { RacersService, Racer } from './../../services/racers.service';
import { MessageService } from 'primeng/api';
import {  of, pipe, Subscription } from 'rxjs';


@Component({
    templateUrl: './racers.component.html',
    styleUrls: ['./racers.component.scss'],
    providers: [MessageService]
})
export class RacersComponent implements OnInit  {
    racers: Racer[];
    racerId: number|null = null;
    @ViewChild(ItemDialogComponent) 
    private itemsDialogComponent: ItemDialogComponent
    private itemsSubscription: Subscription

    tableOptions={
        itemsService: this.racersService,
        globalFilterFields: ['id'],
        cols: [
            {name:'id'},
            // {name:'userId'},
            {name:'userFullName'},
            // {name:'raceId'},
            {name:'raceName'},
            {name:'categoryName'},
        ]
    }

    dialogOptions={
        itemsService: this.racersService,
        fields: [
            { 
                name:'userId', 
                type:'select-items', 
                default:null, 
                itemsService: this.usersService.items$,
                optionValue:'id',
                optionLabel:'fullName',
            },
            {
                name:'raceId', 
                type:'select-items', 
                default:null, 
                itemsService:this.racesService.items$,
                optionValue:'id',
                optionLabel:'name',
            },
            {
                name:'categoryId', 
                type:'select-items', 
                default:null, 
                itemsService:this.categoriesService.items$,
                optionValue:'id',
                optionLabel:'name',
            },
        ]
    }

    constructor(
        public racersService: RacersService, 
        private messageService: MessageService, 
        private usersService: UsersService, 
        private racesService: RacesService, 
        private categoriesService: CategoriesService, 
    ) {}
 
    ngOnInit() {
        // this.racersService.getRacers()
        //     .subscribe();

    }

    openDialog(racer?: Item) {
        this.racerId = racer?racer.id:null
        this.itemsDialogComponent.openDialog(racer)
    }

    saveRacer(racer: Racer) { 
        console.log(racer);
        (!this.racerId?this.racersService.createRacer(racer):this.racersService.updateRacer(racer, this.racerId))
            .pipe(catchError(this.errorHandler))
            .subscribe(res=>{if(res) this.successMessage(this.racerId?'Racer Updated':'Racer Created')})
    }

    refreshRacers() {
      this.racersService.getRacers({force:true})
        .pipe(
          catchError(this.errorHandler)
        )
        .subscribe();
    }

    deleteSelectedRacers(selObject:{items: Racer[], callback:Function}) {
        // this.racers = this.racers.filter(val => !this.selectedItems?.includes(val));
        console.log(selObject.items)
        selObject.callback()
        this.successMessage('Racers Deleted')
    }

    deleteRacer(racer: Racer) {
        this.racersService.deleteRacer(racer.id)
            .pipe(catchError(this.errorHandler))
            .subscribe(res=>this.successMessage('Racer Deleted'))

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
