import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Trip } from './trip.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface TripState extends ArrowState<Trip> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'trip' })
export class TripStore extends ArrowStore<TripState, Trip> {

  constructor() {
    super();
  }

}

