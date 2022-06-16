import { Injectable } from '@angular/core';
import { UseDefModuleStore, UseDefModuleState } from './use-def-module.store';
import { UseDefModule } from './use-def-module.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class UseDefModuleQuery extends QueryArrow<UseDefModuleState, UseDefModule> {

  constructor(protected store: UseDefModuleStore) {
    super(store);
  }

}
