import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Region } from './region.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface RegionState extends ArrowState<Region> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'region' })
export class RegionStore extends ArrowStore<RegionState, Region> {

  constructor() {
    super();
  }

}

