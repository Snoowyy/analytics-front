import { Injectable } from '@angular/core';
import { LocationKindStore, LocationKindState } from './location-kind.store';
import { LocationKind } from './location-kind.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class LocationKindQuery extends QueryArrow<LocationKindState, LocationKind> {

  constructor(protected store: LocationKindStore) {
    super(store);
  }

}
