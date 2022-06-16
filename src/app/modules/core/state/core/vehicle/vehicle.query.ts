import { Injectable } from '@angular/core';
import { VehicleStore, VehicleState } from './vehicle.store';
import { Vehicle } from './vehicle.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class VehicleQuery extends QueryArrow<VehicleState, Vehicle> {

  constructor(protected store: VehicleStore) {
    super(store);
  }

}
