import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { LocationKind } from './location-kind.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface LocationKindState extends ArrowState<LocationKind> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'location-kind' })
export class LocationKindStore extends ArrowStore<LocationKindState, LocationKind> {

  constructor() {
    super();
  }

}

