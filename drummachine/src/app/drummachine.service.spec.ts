import { TestBed } from '@angular/core/testing';

import { DrummachineService } from './drummachine.service';

describe('DrummachineService', () => {
  let service: DrummachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrummachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
