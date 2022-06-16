import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TotalSale } from './total-sale.model';

export interface TotalSalesState extends EntityState<TotalSale> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'totalSales' })
export class TotalSalesStore extends EntityStore<TotalSalesState, TotalSale> {

  constructor() {
    super();
  }

}
