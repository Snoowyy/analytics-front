import { TestBed } from '@angular/core/testing';

import { SetFilterParamsService } from './set-filter-params.service';

describe('SetFilterParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetFilterParamsService = TestBed.get(SetFilterParamsService);
    expect(service).toBeTruthy();
  });
});
