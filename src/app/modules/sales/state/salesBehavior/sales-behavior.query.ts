import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SalesBehaviorStore, SalesBehaviorState } from './sales-behavior.store';
import { SalesBehavior } from './sales-behavior.model';

@Injectable({ providedIn: 'root' })
export class SalesBehaviorQuery extends QueryEntity<SalesBehaviorState, SalesBehavior> {

  constructor(protected store: SalesBehaviorStore) {
    super(store);
  }

}
