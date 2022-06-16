import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModuleStore, UseRightModuleStore, UseRightUserStore, GroupStore, PermissionStore, ContentTypeStore, Group } from '../../../auth/state';
import { ApiResponseData, ApiResponse } from './user-data.models';
import { AuthQuery } from 'src/app/modules/auth/state';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import * as fp from 'lodash/fp';
import linq from 'linq-es2015';
import { map } from 'rxjs/operators';
import { deserializeTableSet } from 'src/app/shared/TableSetUtils';
import { Table } from 'src/vendoring/arrow-js/table';
import { UserBussinessUnitStore } from '../../../auth/state/user-business-unit/user-bussiness-unit.store';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  initialized = false;
  constructor(
    private http: HttpClient,
    private bussinessUnits: UserBussinessUnitStore,
    private modules: ModuleStore,
    private groups: GroupStore,
    private permissions: PermissionStore,
    private contenttypes: ContentTypeStore,
    private useRightModules: UseRightModuleStore,
    private useRightUsers: UseRightUserStore,
    private auth: AuthQuery,
    private permissionsService: NgxPermissionsService,
    private rolesService: NgxRolesService
  ) {
  }

  public get() {
    if (this.modules.isPristine) {
      this._request().subscribe(
        it => {
          this.modules.set(it.modules.table);
          if (!this.auth.isAuthenticated()) { return; }
          this.bussinessUnits.set(it.bussinessUnits.table);
          this.groups.set(it.groups.table);
          this.permissions.set(it.permissions.table);
          this.contenttypes.set(it.contentTypes.table);
          this.useRightModules.set(it.useRightModules.table);
          this.useRightUsers.set(it.userRightUsers.table);
          this.permissionsService.flushPermissions();
          this.permissionsService.loadPermissions(
            linq(it.permissions.table).Select(it2 => it2.codename).ToArray());
          this.rolesService.flushRoles();
          const roles = toRoles(it.groups.table);
          this.rolesService.addRoles(roles);

          function toRoles(x: Table<Group>) {
            return fp.mapValues(
              a => [],
              fp.keyBy(
                'name',
                linq(x)
                  .Select(it2 =>
                    ({ name: it2.name })
                  ).ToArray()
              )
            );
          }
        }
      );
    }
  }

  private _request() {
    return this.http.get(`${environment.gatewayUrl}/user-data/`,
      { responseType: 'arraybuffer' }
    ).pipe(map(it => deserializeTableSet<ApiResponse>(it)));
  }
}
