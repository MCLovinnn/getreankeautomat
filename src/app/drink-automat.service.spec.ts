import { TestBed, inject } from '@angular/core/testing';

import { DrinkAutomatService } from './drink-automat.service';

describe('DrinkServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrinkAutomatService]
    });
  });

  it('should be created', inject([DrinkAutomatService], (service: DrinkAutomatService) => {
    expect(service).toBeTruthy();
  }));
});
