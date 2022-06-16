import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Pinned } from './pinned.model';

export interface PinnedState extends EntityState<Pinned> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pinned' })
export class PinnedStore extends EntityStore<PinnedState, Pinned> {

  constructor() {
    super();
  }

}
