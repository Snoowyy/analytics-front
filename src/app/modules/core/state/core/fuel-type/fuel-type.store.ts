import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { FuelType } from './fuel-type.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface FuelTypeState extends ArrowState<FuelType> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'fuel-type' })
export class FuelTypeStore extends ArrowStore<FuelTypeState, FuelType> {

  constructor() {
    super();
  }

}

