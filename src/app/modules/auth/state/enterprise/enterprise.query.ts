import { Injectable } from '@angular/core';
import { EnterpriseStore, EnterpriseState } from './enterprise.store';
import { Enterprise } from './enterprise.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class EnterpriseQuery extends QueryArrow<EnterpriseState, Enterprise> {

  constructor(protected store: EnterpriseStore) {
    super(store);
  }

}
