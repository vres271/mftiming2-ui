import { Validators } from '@angular/forms';
import { Item } from './../../services/common/items.service';
import { ItemDialogComponent } from './../common/item-dialog/item-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Component, OnInit, ViewChild , } from '@angular/core';
import { SeasonsService, Season } from './../../services/seasons.service';
import { MessageService } from 'primeng/api';
import {  of } from 'rxjs';


@Component({
    templateUrl: './seasons.component.html',
    styleUrls: ['./seasons.component.scss'],
    providers: [MessageService]
})
export class SeasonsComponent implements OnInit  {
    seasons: Season[];
    seasonId: number|null = null;
    @ViewChild(ItemDialogComponent) 
    private itemsDialogComponent: ItemDialogComponent

    tableOptions={
        itemsService: this.seasonsService,
        globalFilterFields: ['name'],
        cols: [
            {name:'name'},
        ]
    }

    dialogOptions={
        itemsService: this.seasonsService,
        fields: [
            {name:'name', default:'', validators: [Validators.required]},
        ]
    }

    constructor(
        public seasonsService: SeasonsService, 
        private messageService: MessageService, 
    ) {}
 
    ngOnInit() {
        // this.seasonsService.getSeasons()
        //     .subscribe();
    }

    openDialog(season?: Item) {
        this.seasonId = season?season.id:null
        this.itemsDialogComponent.openDialog(season)
    }

    saveSeason(season: Season) { 
        (!this.seasonId?this.seasonsService.createSeason(season):this.seasonsService.updateSeason(season, this.seasonId))
            .pipe(catchError(this.errorHandler))
            .subscribe(res=>{if(res) this.successMessage(this.seasonId?'Season Updated':'Season Created')})
    }

    refreshSeasons() {
      this.seasonsService.getSeasons({force:true})
        .pipe(
          catchError(this.errorHandler)
        )
        .subscribe();
    }

    deleteSelectedSeasons(selObject:{items: Season[], callback:Function}) {
        // this.seasons = this.seasons.filter(val => !this.selectedItems?.includes(val));
        console.log(selObject.items)
        selObject.callback()
        this.successMessage('Seasons Deleted')
    }

    deleteSeason(season: Season) {
        this.seasonsService.deleteSeason(season.id)
            .pipe(catchError(this.errorHandler))
            .subscribe(res=>this.successMessage('Season Deleted'))

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
