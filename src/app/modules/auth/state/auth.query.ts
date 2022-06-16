import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthStore, AuthState } from './auth.store';
import { Observable, timer } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { switchMap } from 'rxjs/operators';
import { isAuthenticatedAuthState } from './auth.calculation';
import { ErrorService } from 'src/app/services/errors/error.service';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {

  jwtToken$ = this.select(it => it.token);
  isAuthenticated$ = this.select((it) => isAuthenticatedAuthState(it, this.jwtHelper));

  constructor(
    protected store: AuthStore,
    private jwtHelper: JwtHelperService,
    private errorService: ErrorService
  ) {
    super(store);
  }

  getEmailFromActiveDirectory() {
    return this.getSnapshot().emailActiveDirectory;
  }

  isAuthenticated() {
    return isAuthenticatedAuthState(this.getSnapshot(), this.jwtHelper);
  }
}
