import { TestBed } from '@angular/core/testing';

import { DetailStockService } from './detail-stock.service';

describe('DetailStockService', () => {
  let service: DetailStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
