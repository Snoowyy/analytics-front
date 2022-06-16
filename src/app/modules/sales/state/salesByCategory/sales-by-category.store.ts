import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SalesByCategory } from './sales-by-category.model';

export interface SalesByCategoryState extends EntityState<SalesByCategory[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'salesByCategory' })
export class SalesByCategoryStore extends EntityStore<SalesByCategoryState, SalesByCategory[]> {

  constructor() {
    super({ loading: false });
  }

}
