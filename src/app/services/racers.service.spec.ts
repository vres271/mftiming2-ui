import { TestBed } from '@angular/core/testing';

import { RacersService } from './racers.service';

describe('RacersService', () => {
  let service: RacersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RacersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
