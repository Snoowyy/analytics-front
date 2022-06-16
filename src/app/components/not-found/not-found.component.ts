import { Component, OnInit } from '@angular/core';
import { constants } from '../../shared/constants';
import { isAuthenticatedAuthState, getAccessTokenJson } from 'src/app/modules/auth/state/auth.calculation';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { AuthQuery } from 'src/app/modules/auth/state';
import { Observable } from 'rxjs';
import { HeaderServices } from 'src/app/modules/core/services/header-service/header.services';
import { ErrorService } from 'src/app/services/errors/error.service';

@Component({
  selector: 'cvn-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constantsErrors = constants.httpInterceptor[404];
  loggedState$: Observable<boolean>;
  _constants = constants.modules.notFound;

  constructor(
    private authQuery: AuthQuery,
    private jwtHelper: JwtHelperService,
    private headerServices: HeaderServices,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.loggedState$ = this.authQuery.select(it => it)
      .pipe(
        map(it => isAuthenticatedAuthState(it, this.jwtHelper)),
      );
    this.headerServices.setModel(this._constants.HEAD_IMG_URL, this._constants.HEAD_TITLE, true);
  }

}
