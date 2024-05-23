import { TestBed } from '@angular/core/testing';

import { IncomeRevenueService } from './income-revenue.service';

describe('IncomeRevenueService', () => {
  let service: IncomeRevenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeRevenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
