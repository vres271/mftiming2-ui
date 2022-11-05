import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacersComponent } from './racers.component';

describe('RacersComponent', () => {
  let component: RacersComponent;
  let fixture: ComponentFixture<RacersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RacersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
