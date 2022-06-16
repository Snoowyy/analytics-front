import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { UseRightModule } from './use-right-module.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface UseRightModuleState extends ArrowState<UseRightModule> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'use-right-module' })
export class UseRightModuleStore extends ArrowStore<UseRightModuleState, UseRightModule> {

  constructor() {
    super();
  }

}

