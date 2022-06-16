import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { VehicleType } from './vehicle-type.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface VehicleTypeState extends ArrowState<VehicleType> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'vehicle-type' })
export class VehicleTypeStore extends ArrowStore<VehicleTypeState, VehicleType> {

  constructor() {
    super();
  }

}

