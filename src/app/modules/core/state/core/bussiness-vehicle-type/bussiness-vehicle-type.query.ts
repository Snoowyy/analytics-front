import { Injectable } from '@angular/core';
import { BussinessVehicleTypeStore, BussinessVehicleTypeState } from './bussiness-vehicle-type.store';
import { BussinessVehicleType } from './bussiness-vehicle-type.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class BussinessVehicleTypeQuery extends QueryArrow<BussinessVehicleTypeState, BussinessVehicleType> {

  constructor(protected store: BussinessVehicleTypeStore) {
    super(store);
  }

}
