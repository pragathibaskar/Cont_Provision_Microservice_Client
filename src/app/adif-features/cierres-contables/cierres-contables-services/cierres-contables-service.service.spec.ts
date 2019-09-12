import { TestBed } from '@angular/core/testing';

import { CierresContablesServiceService } from './cierres-contables-service.service';

describe('CierresContablesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CierresContablesServiceService = TestBed.get(CierresContablesServiceService);
    expect(service).toBeTruthy();
  });
});
