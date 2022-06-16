import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SalesBehaviorByTimeSeries } from './sales-behavior-by-time-series.model';

export interface SalesBehaviorByTimeSeriesState extends EntityState<SalesBehaviorByTimeSeries[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'salesBehaviorByTimeSeries' })
export class SalesBehaviorByTimeSeriesStore extends EntityStore<SalesBehaviorByTimeSeriesState, SalesBehaviorByTimeSeries[]> {

  constructor() {
    super({ loading: false});
  }

}
