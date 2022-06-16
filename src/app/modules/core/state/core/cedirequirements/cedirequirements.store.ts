import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { CediRequirements } from './cedirequirements.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface CediRequirementsState extends ArrowState<CediRequirements> { }

@Injectable({ providedIn: 'root' })
  @StoreConfig({ name: 'cedirequirements' })
export class CediRequirementsStore extends ArrowStore<CediRequirementsState, CediRequirements> {

  constructor() {
    super();
  }

}

