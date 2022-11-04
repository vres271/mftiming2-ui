import { Validators } from '@angular/forms';
import { Item } from './../../services/common/items.service';
import { ItemDialogComponent } from './../common/item-dialog/item-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Component, OnInit, ViewChild , } from '@angular/core';
import { RacesService, Race } from './../../services/races.service';
import { MessageService } from 'primeng/api';
import {  of } from 'rxjs';


@Component({
    templateUrl: './races.component.html',
    styleUrls: ['./races.component.scss'],
    providers: [MessageService]
})
export class RacesComponent implements OnInit  {
    races: Race[];
    raceId: number|null = null;
    @ViewChild(ItemDialogComponent) 
    private itemsDialogComponent: ItemDialogComponent

    tableOptions={
        itemsService: this.racesService,
        globalFilterFields: ['name'],
        cols: [
            {name:'name'},
            {name:'start'},
            {name:'end'},
        ]
    }

    dialogOptions={
        itemsService: this.racesService,
        fields: [
            {name:'name', default:'', validators: [Validators.required]},
            {name:'start', default:null},
            {name:'end', default:null},
        ]
    }

    constructor(
        public racesService: RacesService, 
        private messageService: MessageService, 
    ) {}
 
    ngOnInit() {
        // this.racesService.getRaces()
        //     .subscribe();
    }

    openDialog(race?: Item) {
        this.raceId = race?race.id:null
        this.itemsDialogComponent.openDialog(race)
    }

    saveRace(race: Race) { 
        (!this.raceId?this.racesService.createRace(race):this.racesService.updateRace(race, this.raceId))
            .pipe(catchError(this.errorHandler))
            .subscribe(res=>{if(res) this.successMessage(this.raceId?'Race Updated':'Race Created')})
    }

    refreshRaces() {
      this.racesService.getRaces({force:true})
        .pipe(
          catchError(this.errorHandler)
        )
        .subscribe();
    }

    deleteSelectedRaces(selObject:{items: Race[], callback:Function}) {
        // this.races = this.races.filter(val => !this.selectedItems?.includes(val));
        console.log(selObject.items)
        selObject.callback()
        this.successMessage('Races Deleted')
    }

    deleteRace(race: Race) {
        this.racesService.deleteRace(race.id)
            .pipe(catchError(this.errorHandler))
            .subscribe(res=>this.successMessage('Race Deleted'))

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
