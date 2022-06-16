import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Vehicle } from './vehicle.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface VehicleState extends ArrowState<Vehicle> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'vehicle' })
export class VehicleStore extends ArrowStore<VehicleState, Vehicle> {

  constructor() {
    super();
  }

}

