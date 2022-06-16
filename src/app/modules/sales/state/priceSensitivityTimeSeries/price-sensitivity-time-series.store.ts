import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PriceSensitivityTimeSeries } from './price-sensitivity-time-series.model';

export interface PriceSensitivityTimeSeriesState extends EntityState<PriceSensitivityTimeSeries> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'priceSensitivityTimeSeries' })
export class PriceSensitivityTimeSeriesStore extends EntityStore<PriceSensitivityTimeSeriesState, PriceSensitivityTimeSeries> {

  constructor() {
    super({ loading: false});
  }

}
