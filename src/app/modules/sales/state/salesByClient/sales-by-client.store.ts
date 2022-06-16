import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SalesByClient } from './sales-by-client.model';

export interface SalesByClientState extends EntityState<SalesByClient[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'salesByClient' })
export class SalesByClientStore extends EntityStore<SalesByClientState, SalesByClient[]> {

  constructor() {
    super({ loading: false });
  }

}
