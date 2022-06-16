import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Module } from './module.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';
import { Table_fromJsonValue, getFloat32Vector, getInt32Vector, getUtf8Vector, getIndexes } from 'src/app/shared/TableSetUtils';
import { createInitialStateBase } from 'src/app/shared/models/_shared_';

export interface ModuleState extends ArrowState<Module> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'module' })
export class ModuleStore extends ArrowStore<ModuleState, Module> {

  constructor() {
    super(createInitialState('module'));
  }

}

function createInitialState(storeName: string) {
  const table = Table_fromJsonValue<Module>([], {
    id: getInt32Vector,
    Arrown: getUtf8Vector,
    BaseImage: getUtf8Vector,
    Color: getUtf8Vector,
    CvnPath: getUtf8Vector,
    Description: getUtf8Vector,
    Kpi: getUtf8Vector,
    KpiFooter: getUtf8Vector,
    KpiHeader: getUtf8Vector,
    KpiText: getUtf8Vector,
    Name: getUtf8Vector,
    Position: getInt32Vector
  });
  return createInitialStateBase(table, storeName);
}
