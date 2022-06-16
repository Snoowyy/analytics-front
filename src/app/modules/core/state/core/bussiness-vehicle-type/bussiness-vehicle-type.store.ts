import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { BussinessVehicleType } from './bussiness-vehicle-type.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface BussinessVehicleTypeState extends ArrowState<BussinessVehicleType> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'bussiness-vehicle-type' })
export class BussinessVehicleTypeStore extends ArrowStore<BussinessVehicleTypeState, BussinessVehicleType> {

  constructor() {
    super();
  }

}

