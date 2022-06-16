import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TotalSalesStore, TotalSalesState } from './total-sales.store';
import { TotalSale } from './total-sale.model';

@Injectable({ providedIn: 'root' })
export class TotalSalesQuery extends QueryEntity<TotalSalesState, TotalSale> {

  constructor(protected store: TotalSalesStore) {
    super(store);
  }

}
