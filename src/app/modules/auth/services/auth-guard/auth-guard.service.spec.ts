import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';

describe('AuthGuardService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService]
    });

    it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
      expect(service).toBeTruthy();
    }));
  });
});
