import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Enterprise } from './enterprise.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface EnterpriseState extends ArrowState<Enterprise> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'enterprise' })
export class EnterpriseStore extends ArrowStore<EnterpriseState, Enterprise> {

  constructor() {
    super();
  }

}

