import { TestBed } from '@angular/core/testing';

import { APPService } from './app.service';

describe('APPService', () => {
  let service: APPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
