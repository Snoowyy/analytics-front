import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Submodules } from './submodules.model';

export interface SubmodulesState extends EntityState<Submodules[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'submodules' })
export class SubmodulesStore extends EntityStore<SubmodulesState, Submodules[]> {

  constructor() {
    super();
  }

}
