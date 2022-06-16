import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Inventory } from './inventory.model';

export interface InventoryState extends EntityState<Inventory> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'inventory' })
export class InventoryStore extends EntityStore<InventoryState, Inventory> {

  constructor() {
    super();
  }

}
