import { Injectable } from '@angular/core';
import { CityStore, CityState } from './city.store';
import { City } from './city.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class CityQuery extends QueryArrow<CityState, City> {

  constructor(protected store: CityStore) {
    super(store);
  }

}
