import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { EconomicSector } from './economic-sector.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface EconomicSectorState extends ArrowState<EconomicSector> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'economic-sector' })
export class EconomicSectorStore extends ArrowStore<EconomicSectorState, EconomicSector> {

  constructor() {
    super();
  }

}

