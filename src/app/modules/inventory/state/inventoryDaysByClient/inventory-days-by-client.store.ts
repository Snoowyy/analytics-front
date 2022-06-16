import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { InventoryDaysByClient } from './inventory-days-by-client.model';

export interface InventoryDaysByClientState extends EntityState<InventoryDaysByClient[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'inventoryDaysByClient' })
export class InventoryDaysByClientStore extends EntityStore<InventoryDaysByClientState, InventoryDaysByClient[]> {

  constructor() {
    super();
  }

}
