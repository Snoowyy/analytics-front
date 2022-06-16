import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Multiselect } from './multiselect.model';

export interface MultiselectState extends EntityState<Multiselect[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'multiselect' })
export class MultiselectStore extends EntityStore<MultiselectState, Multiselect[]> {

  constructor() {
    super();
  }

}
