import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SalesByTimeSeries } from './sales-by-time-series.model';

export interface SalesByTimeSeriesState extends EntityState<SalesByTimeSeries> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'salesByTimeSeries' })
export class SalesByTimeSeriesStore extends EntityStore<SalesByTimeSeriesState, SalesByTimeSeries> {

  constructor() {
    super({ loading: false });
  }

}
