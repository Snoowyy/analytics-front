import { Injectable } from '@angular/core';
import { VehicleTypeStore, VehicleTypeState } from './vehicle-type.store';
import { VehicleType } from './vehicle-type.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class VehicleTypeQuery extends QueryArrow<VehicleTypeState, VehicleType> {

  constructor(protected store: VehicleTypeStore) {
    super(store);
  }

}
