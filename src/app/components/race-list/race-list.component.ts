import { AuthService } from './../../services/auth.service';
import { CategoriesService } from './../../services/categories.service';
import { RacersService } from './../../services/racers.service';
import { RacesService } from './../../services/races.service';
import { SeasonsService } from './../../services/seasons.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.scss']
})
export class RaceListComponent implements OnInit {

  constructor(
    public seasonsService: SeasonsService,
    public racesService: RacesService,
    public racersService: RacersService,
    public categoriesService: CategoriesService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
