import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { VsComparationTimeSeries } from './vs-comparation-time-series.model';

export interface VsComparationTimeSeriesState extends EntityState<VsComparationTimeSeries> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'vsComparationTimeSeries' })
export class VsComparationTimeSeriesStore extends EntityStore<VsComparationTimeSeriesState, VsComparationTimeSeries> {

  constructor() {
    super();
  }

}
