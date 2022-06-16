import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { UseDefModule } from './use-def-module.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface UseDefModuleState extends ArrowState<UseDefModule> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'use-def-module' })
export class UseDefModuleStore extends ArrowStore<UseDefModuleState, UseDefModule> {

  constructor() {
    super();
  }

}

