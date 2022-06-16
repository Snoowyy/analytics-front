import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { ChassisType } from './chassis-type.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface ChassisTypeState extends ArrowState<ChassisType> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chassis-type' })
export class ChassisTypeStore extends ArrowStore<ChassisTypeState, ChassisType> {

  constructor() {
    super();
  }

}

