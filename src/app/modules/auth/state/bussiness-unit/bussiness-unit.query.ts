import { Injectable } from '@angular/core';
import { BussinessUnitStore, BussinessUnitState } from './bussiness-unit.store';
import { BussinessUnit } from './bussiness-unit.model';
import { QueryArrow } from 'src/app/shared/arrow-akita/arrow.query';
import { UserQuery } from '../user/user.query';
import { UserStore } from '../user/user.store';
import linq from 'linq-es2015';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BussinessUnitQuery extends QueryArrow<BussinessUnitState, BussinessUnit> {

  constructor(
    protected store: BussinessUnitStore,
    protected userQuery: UserQuery,
    protected userStore: UserStore,
  ) {
    super(store);
  }

}
