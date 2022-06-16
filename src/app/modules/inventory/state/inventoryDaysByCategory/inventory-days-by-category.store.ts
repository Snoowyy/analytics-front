import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { InventoryDaysByCategory } from './inventory-days-by-category.model';

export interface InventoryDaysByCategoryState extends EntityState<InventoryDaysByCategory[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'inventoryDaysByCategory' })
export class InventoryDaysByCategoryStore extends EntityStore<InventoryDaysByCategoryState, InventoryDaysByCategory[]> {

  constructor() {
    super();
  }

}
