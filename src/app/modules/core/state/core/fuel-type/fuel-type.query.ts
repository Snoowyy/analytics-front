import { Injectable } from '@angular/core';
import { FuelTypeStore, FuelTypeState } from './fuel-type.store';
import { FuelType } from './fuel-type.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class FuelTypeQuery extends QueryArrow<FuelTypeState, FuelType> {

  constructor(protected store: FuelTypeStore) {
    super(store);
  }

}
