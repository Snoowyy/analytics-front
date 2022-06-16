import { TestBed, inject } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

describe('UserDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService]
    });
  });

  // it('should be created', inject([UserDataService], (service: UserDataService) => {
  //   expect(service).toBeTruthy();
  // }));
});
