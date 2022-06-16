import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RankingPointsSale } from './ranking-points-sale.model';

export interface RankingPointsSaleState extends EntityState<RankingPointsSale> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'rankingPointsSale' })
export class RankingPointsSaleStore extends EntityStore<RankingPointsSaleState, RankingPointsSale> {

  constructor() {
    super();
  }

}
