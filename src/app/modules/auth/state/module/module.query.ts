import { Injectable } from '@angular/core';
import { ModuleStore, ModuleState } from './module.store';
import { Module } from './module.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class ModuleQuery extends QueryArrow<ModuleState, Module> {

  constructor(protected store: ModuleStore) {
    super(store);
  }

}
