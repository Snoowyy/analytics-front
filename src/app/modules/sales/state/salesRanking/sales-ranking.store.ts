import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SalesRanking } from './sales-ranking.model';

export interface SalesRankingState extends EntityState<SalesRanking> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'salesRanking' })
export class SalesRankingStore extends EntityStore<SalesRankingState, SalesRanking> {

  constructor() {
    super({ loading : false});
  }

}

