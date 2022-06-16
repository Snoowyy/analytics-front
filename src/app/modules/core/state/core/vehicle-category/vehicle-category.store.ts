import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { VehicleCategory } from './vehicle-category.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface VehicleCategoryState extends ArrowState<VehicleCategory> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'vehicle-category' })
export class VehicleCategoryStore extends ArrowStore<VehicleCategoryState, VehicleCategory> {

  constructor() {
    super();
  }

}

