import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { InventoryDaysByPointsSale } from './inventory-days-by-points-sale.model';

export interface InventoryDaysByPointsSaleState extends EntityState<InventoryDaysByPointsSale[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'inventoryDaysByPointsSale' })
export class InventoryDaysByPointsSaleStore extends EntityStore<InventoryDaysByPointsSaleState, InventoryDaysByPointsSale[]> {

  constructor() {
    super();
  }

}
