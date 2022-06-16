import { Injectable } from '@angular/core';
import { ChassisTypeStore, ChassisTypeState } from './chassis-type.store';
import { ChassisType } from './chassis-type.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class ChassisTypeQuery extends QueryArrow<ChassisTypeState, ChassisType> {

  constructor(protected store: ChassisTypeStore) {
    super(store);
  }

}
