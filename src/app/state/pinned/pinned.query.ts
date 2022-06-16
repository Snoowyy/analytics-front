import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { QueryEntity } from '@datorama/akita';
import { PinnedStore, PinnedState } from './pinned.store';
import { Pinned } from './pinned.model';

@Injectable({ providedIn: 'root' })
export class PinnedQuery extends QueryEntity<PinnedState, Pinned> {

  constructor(protected store: PinnedStore) {
    super(store);
  }

  public get(): Observable<Pinned> {
    return this.selectEntity('pinned');
  }

}
