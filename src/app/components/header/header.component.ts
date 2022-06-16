import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, merge } from 'rxjs';
import { map, shareReplay, switchMap, filter } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HeaderServices, HeaderModel } from 'src/app/modules/core/services/header-service/header.services';
import { AuthService, AuthQuery } from 'src/app/modules/auth/state';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { isAuthenticatedAuthState, getUserData } from 'src/app/modules/auth/state/auth.calculation';
import { UserDataService } from '../../modules/core/services/user-data/user-data.service';
import { UserBussinessUnitQuery } from '../../modules/auth/state/user-business-unit/user-bussiness-unit.query';
import { ErrorService } from 'src/app/services/errors/error.service';

interface UserData {
  email: string;
  username: string;
}

const noAuth = <HeaderState>{
  isAuthenticated: false
};

@Component({
  selector: 'cvn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  state$: Observable<HeaderState>;
  show: boolean;
  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private headerServices: HeaderServices,
    private userbussinessUnitQuery: UserBussinessUnitQuery,
    private userService: UserService,
    private jwtHelper: JwtHelperService,
  ) { }

  ngOnInit() {
    const loggedState = this.authQuery.select(it => it)
      .pipe(
        filter(it => isAuthenticatedAuthState(it, this.jwtHelper)),
        switchMap(it => getUserData(this.userService, it, this.jwtHelper)),
        switchMap(
          it => this.userbussinessUnitQuery.getHeaderData(it.bussinessUnitId),
          (ud, bu) => <HeaderState>{
            ...ud,
            ...bu,
            isAuthenticated: true
          }
        )
      );

    const unloggedState = this.authQuery.select(it => it)
      .pipe(
        filter(it => !isAuthenticatedAuthState(it, this.jwtHelper)),
        map(it => noAuth)
      );
    this.state$ = merge(loggedState, unloggedState).pipe(
      shareReplay()
    );
  }


  get headerModel(): HeaderModel {
    return this.headerServices.getModel();
  }

  public onToggle(): void {
    this.show = !this.show;
  }

  public async logout() {
    this.show = false;
    this.authService.deauthenticate();
    location.href = '/home';
  }
}

interface HeaderState {
  username: string;
  email: string;
  companyName: string;
  ImageUrl: string;
  isAuthenticated: boolean;
}
