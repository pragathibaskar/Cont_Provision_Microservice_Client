import { TestBed } from '@angular/core/testing';

import { ProvisionesAsscoadasService } from './provisiones-asscoadas.service';

describe('ProvisionesAsscoadasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvisionesAsscoadasService = TestBed.get(ProvisionesAsscoadasService);
    expect(service).toBeTruthy();
  });
});
