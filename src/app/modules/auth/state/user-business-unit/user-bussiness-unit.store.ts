import { Injectable } from '@angular/core';
import { UserBussinessUnit } from './user-bussiness-unit.model';
import { StoreConfig } from '@datorama/akita';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface UserBussinessUnitState extends ArrowState<UserBussinessUnit> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user-bussiness-unit' })
export class UserBussinessUnitStore extends ArrowStore<UserBussinessUnitState, UserBussinessUnit> {

  constructor() {
    super();
  }

}

