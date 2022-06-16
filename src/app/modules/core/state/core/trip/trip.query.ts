import { Injectable } from '@angular/core';
import { TripStore, TripState } from './trip.store';
import { Trip } from './trip.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class TripQuery extends QueryArrow<TripState, Trip> {

  constructor(protected store: TripStore) {
    super(store);
  }

}
