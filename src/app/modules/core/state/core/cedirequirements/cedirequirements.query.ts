import { Injectable } from '@angular/core';
import { CediRequirementsStore, CediRequirementsState } from './cedirequirements.store';
import { CediRequirements } from './cedirequirements.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class CediRequirementsQuery extends QueryArrow<CediRequirementsState, CediRequirements> {

  constructor(protected store: CediRequirementsStore) {
    super(store);
  }

}
