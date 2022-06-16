import { Injectable } from '@angular/core';
import { VehicleCategoryStore, VehicleCategoryState } from './vehicle-category.store';
import { VehicleCategory } from './vehicle-category.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class VehicleCategoryQuery extends QueryArrow<VehicleCategoryState, VehicleCategory> {

  constructor(protected store: VehicleCategoryStore) {
    super(store);
  }

}
