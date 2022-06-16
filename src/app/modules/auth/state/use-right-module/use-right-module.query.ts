import { Injectable } from '@angular/core';
import { UseRightModuleStore, UseRightModuleState } from './use-right-module.store';
import { UseRightModule } from './use-right-module.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class UseRightModuleQuery extends QueryArrow<UseRightModuleState, UseRightModule> {

  constructor(protected store: UseRightModuleStore) {
    super(store);
  }

}
