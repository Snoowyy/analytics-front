import { TestBed, inject } from '@angular/core/testing';

import { CvnCacheService } from './cvn-cache.service';

describe('DnsDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CvnCacheService]
    });
  });

  it('should be created', inject([CvnCacheService], (service: CvnCacheService) => {
    expect(service).toBeTruthy();
  }));
});
