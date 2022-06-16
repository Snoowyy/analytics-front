import { Injectable } from '@angular/core';
import { LocationStore, LocationState } from './location.store';
import { Location } from './location.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class LocationQuery extends QueryArrow<LocationState, Location> {

  constructor(protected store: LocationStore) {
    super(store);
  }

}
