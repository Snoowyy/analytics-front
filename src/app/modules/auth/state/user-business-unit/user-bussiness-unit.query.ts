import { Injectable } from '@angular/core';
import { UserBussinessUnitStore, UserBussinessUnitState } from './user-bussiness-unit.store';
import { UserBussinessUnit } from './user-bussiness-unit.model';
import { QueryArrow } from 'src/app/shared/arrow-akita/arrow.query';
import { UserQuery } from '../user/user.query';
import { UserStore } from '../user/user.store';
import linq from 'linq-es2015';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserBussinessUnitQuery extends QueryArrow<UserBussinessUnitState, UserBussinessUnit> {
  bussinessUnitsByCurrentUser$ = this.select(it => it.table);

  constructor(
    protected store: UserBussinessUnitStore,
    protected userQuery: UserQuery,
    protected userStore: UserStore,
  ) {
    super(store);
  }

  notFoundImage = '';

  getHeaderData(id: number) {
    return this.store._select(it => it)
      .pipe(
        filter(it => it.table.numCols > 0),
        map(it => this._getHeaderData(it, id))
      );
  }

  getBusinessUnitData(id: number) {
    return this.store._select(it => it)
      .pipe(
        filter(it => it.table.numCols > 0),
        map(it => this._userBusinessUnit(it, id))
      );
  }

  private _userBusinessUnit(it: UserBussinessUnitState, employeer_id: number) {
    return linq(it.table).FirstOrDefault(it2 => it2.Enterprise__id === employeer_id || it2.Enterprise_id === employeer_id);
  }

  private _getHeaderData(it: UserBussinessUnitState, employeer_id: number) {
    const bussinessUnit = this._userBusinessUnit(it, employeer_id);
    return {
      companyName: bussinessUnit ? bussinessUnit.Name : '',
      ImageUrl: (bussinessUnit ? bussinessUnit.ImageUrl : null) || this.notFoundImage,
    };
  }
}
