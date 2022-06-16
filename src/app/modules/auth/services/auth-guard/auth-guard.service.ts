import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthQuery } from '../../state';
import { Observable, of } from 'rxjs';
import { UserDataService } from 'src/app/modules/core/services/user-data/user-data.service';
import { PermissionQuery, GroupQuery } from 'src/app/modules/auth/state';
import { NgxPermissionsGuard, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { combineLatest, map, filter, first } from 'rxjs/operators';

@Injectable()
export class AuthGuardService extends NgxPermissionsGuard {

  constructor(
    private authQuery: AuthQuery,
    private userdataService: UserDataService,
    private permissions: PermissionQuery,
    private groups: GroupQuery,

    permissionsService: NgxPermissionsService,
    rolesService: NgxRolesService,
    private router2: Router,

  ) {
    super(permissionsService, rolesService, router2);
  }

  isFromHome(state: RouterStateSnapshot) {
    return state.url.includes('home') || state.url.includes('select');
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.authQuery.isAuthenticated()) {
      if (!this.isFromHome(state)) {
        const url = `?redirecto=${state.url}`;
        this.router2.navigateByUrl(`user${url}`);
      }
      if (state.url.includes('select')) {
        this.router2.navigate(['home']);
      }
      return Promise.resolve(false);
    }

    this.userdataService.get();
    await this.permissions.selectLoading().pipe(
      combineLatest(this.groups.selectLoading()),
      filter(it => !it[0] && !it[1]),
      first(),
      map(it => true)
    ).toPromise();
    return super.canActivate(route, state);
  }
}
