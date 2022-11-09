import { RacesService } from './../../services/races.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-racer-registration',
  templateUrl: './racer-registration.component.html',
  styleUrls: ['./racer-registration.component.scss']
})
export class RacerRegistrationComponent implements OnInit {

  itemsForm: FormGroup
  defaults:any = {}

  constructor(
    private fb: FormBuilder,
    public categoriesService: CategoriesService,
    public racesService: RacesService,
  ) { }

  ngOnInit(): void {
    this.itemsForm = this.fb.group({
      categoryId: [0, [Validators.required]],
      raceId: [0, [Validators.required]],
    });

  }
  register(): void {}

}
