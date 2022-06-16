import { Injectable } from '@angular/core';
import { RegionStore, RegionState } from './region.store';
import { Region } from './region.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class RegionQuery extends QueryArrow<RegionState, Region> {

  constructor(protected store: RegionStore) {
    super(store);
  }

}
