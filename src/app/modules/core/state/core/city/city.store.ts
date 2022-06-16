import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { City } from './city.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface CityState extends ArrowState<City> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'city' })
export class CityStore extends ArrowStore<CityState, City> {

  constructor() {
    super();
  }

}

