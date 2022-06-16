import { Injectable } from '@angular/core';
import { EconomicSectorStore, EconomicSectorState } from './economic-sector.store';
import { EconomicSector } from './economic-sector.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class EconomicSectorQuery extends QueryArrow<EconomicSectorState, EconomicSector> {

  constructor(protected store: EconomicSectorStore) {
    super(store);
  }

}
