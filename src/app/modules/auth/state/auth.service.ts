import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, filter } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { timer, empty, ReplaySubject } from 'rxjs';
import { AuthStore, Credential, RefreshRequestData, AuthApiResponse, AuthState } from './auth.store';
import { AuthQuery } from './auth.query';
import * as moment from 'moment';
import { environment as env } from 'src/environments/environment';
import { AngularIndexedDB } from 'src/app/shared/angular.indexed-db';
import { CvnCacheService } from '../../core/services/cvn-cache/cvn-cache.service';
import { ModuleQuery } from './module/module.query';
import { UserDataService } from '../../core/services/user-data/user-data.service';
import { resetStores } from '@datorama/akita';

@Injectable()
export class AuthService {

  private authApiResponse$ = new ReplaySubject<AuthApiResponse>();

  constructor(
    private http: HttpClient,
    private authStore: AuthStore,
    private jwtHelper: JwtHelperService,
    private authQuery: AuthQuery,
    private cacheService: CvnCacheService,
    private modules: ModuleQuery
  ) {
    this.autoRefreshToken();
    this.configureActionOnApiResponse();
  }

  /**
   * When the system gets a new API Response, call
   * setAuthApiResponse.
   */
  private configureActionOnApiResponse() {
    this.authApiResponse$.pipe(
      catchError(it => {
        this.authStore.setError(it);
        return empty();
      })
    )
      .subscribe(
        it => this.setAuthApiResponse(this.authStore._value(), it)
      );
  }

  /**
   * Call RefreshToken, 30 second before the JWT Token expires.
   */
  private autoRefreshToken() {
    this.authQuery.jwtToken$
      .pipe(
        filter(it => Boolean(it)),
        switchMap(it =>
          timer(
            moment(this.jwtHelper.getTokenExpirationDate(it))
              .subtract(30, 'seconds')
              .toDate()
          )
        )
      ).subscribe(() => {
        const payload = this.authQuery.getSnapshot();
        this.RefreshToken(payload.token, payload.refreshToken);
      });
  }

  public Authenticate(username: string, password: string) {
    this.http.post<AuthApiResponse>(
      `${env.authRestApiRoot}/Authenticate/`, <Credential>{
        Email: username,
        Password: password
      }
    ).subscribe({
      next: it => this.authApiResponse$.next(it),
      error: it => this.authApiResponse$.error(it)
    });
  }

  public deauthenticate() {
    this.cacheService.clear();
    resetStores();
    this.authStore.logout();
  }

  private setAuthApiResponse(oldState: AuthState, data: AuthApiResponse) {
    if (data.apiException.isError) {
      this.authStore.setError(data.apiException);
      return;
    }
    if (this.jwtHelper.isTokenExpired(data.resultToken.token)) {
      this.authStore.setError({ message: 'El token ha expirado' });
      return;
    }

    const payload = {
      token: data.resultToken.token,
      error: data.resultToken.error,
      expires: this.jwtHelper.getTokenExpirationDate(data.resultToken.token),
      emailActiveDirectory: this.getEmailActiveDirectory(data)
        || oldState.emailActiveDirectory,
      refreshToken: data.resultToken.refreshToken
    };
    this.authStore.login(payload);
  }

  private getEmailActiveDirectory(data: AuthApiResponse) {
    if (!data) {
      return null;
    }

    if (!data.resultToken) {
      return null;
    }

    return data.resultToken.emailActiveDirectory;
  }

  private RefreshToken(accessToken: string, refreshToken: string) {
    this.http.post<AuthApiResponse>(`${env.authRestApiRoot}/Refresh`,
      <RefreshRequestData>{
        Token: accessToken,
        RefreshToken: refreshToken
      }).subscribe({
        next: it => this.authApiResponse$.next(it),
        error: it => this.authApiResponse$.error(it)
      });
  }
}
