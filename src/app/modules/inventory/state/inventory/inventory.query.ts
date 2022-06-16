import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { InventoryStore, InventoryState } from './inventory.store';
import { Inventory } from './inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryQuery extends QueryEntity<InventoryState, Inventory> {

  constructor(protected store: InventoryStore) {
    super(store);
  }

}
