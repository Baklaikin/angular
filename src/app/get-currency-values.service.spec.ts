import { TestBed } from '@angular/core/testing';

import { GetCurrencyValuesService } from './get-currency-values.service';

describe('GetCurrencyValuesService', () => {
  let service: GetCurrencyValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCurrencyValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
