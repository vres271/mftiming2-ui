import { Subscription } from 'rxjs';
import { RacersService } from './../../services/racers.service';
import { CategoriesService } from './../../services/categories.service';
import { RacesService } from './../../services/races.service';
import { SeasonsService, Season } from './../../services/seasons.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnDestroy {
  itemsTree: TreeNode[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private seasonsService: SeasonsService,
    private racesService: RacesService,
    private racersService: RacersService,
    private categoriesService: CategoriesService,
  ) { }

  private createNode = (id:number, name:string, expandedIcon:string='folder-open',collapsedIcon:string='folder'):TreeNode=>{
    return {
      label: name,
      data: name+" Folder",
      expandedIcon: "pi pi-"+expandedIcon,
      collapsedIcon: "pi pi-"+collapsedIcon,
      children: []
    }
  }

  ngOnInit(): void {

    this.seasonsService.items$
      .subscribe((items:Season[])=>items.forEach(season=>{
        const seasonItem = this.createNode(season.id, season.name, 'calendar', 'calendar')

        const racesFolder = this.createNode(0, 'Races', 'clock', 'clock')
        seasonItem.children?.push(racesFolder)
        this.racesService.items.filter(race=>race.seasonId===season.id).forEach(race=>{
          const raceItem = this.createNode(race.id, race.name, 'clock', 'clock')

          this.racersService.items.filter(racer=>racer.raceId===race.id).forEach(racer=>{
            const racerItem = this.createNode(racer.id, racer.userFullName+' : '+racer.categoryName, 'user', 'user')
            raceItem?.children?.push(racerItem)
          })

          racesFolder?.children?.push(raceItem)
        })

        const categoriesFolder = this.createNode(0, 'Categories', 'users', 'users')
        seasonItem.children?.push(categoriesFolder)
        this.categoriesService.items.filter(category=>category.seasonId===season.id).forEach(category=>{
          const categoryItem = this.createNode(category.id, category.name, 'users', 'users')
          categoriesFolder?.children?.push(categoryItem)
        })


        this.itemsTree.push(seasonItem)
      })
    )

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

}
