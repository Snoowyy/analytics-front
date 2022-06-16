import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SalesBehavior } from './sales-behavior.model';

export interface SalesBehaviorState extends EntityState<SalesBehavior> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'salesBehavior' })
export class SalesBehaviorStore extends EntityStore<SalesBehaviorState, SalesBehavior> {

  constructor() {
    super();
  }

}
