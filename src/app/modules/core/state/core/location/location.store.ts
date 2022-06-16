import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Location } from './location.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface LocationState extends ArrowState<Location> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'location' })
export class LocationStore extends ArrowStore<LocationState, Location> {

  constructor() {
    super();
  }

}

