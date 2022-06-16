import { Injectable } from '@angular/core';
import { BussinessUnit } from './bussiness-unit.model';
import { StoreConfig } from '@datorama/akita';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface BussinessUnitState extends ArrowState<BussinessUnit> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'bussiness-unit' })
export class BussinessUnitStore extends ArrowStore<BussinessUnitState, BussinessUnit> {

  constructor() {
    super();
  }

}

