import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { QueryEntity } from '@datorama/akita';
import { SubmodulesState, SubmodulesStore  } from './submodules.store';
import { Submodules } from './submodules.model';

@Injectable({ providedIn: 'root' })
export class SubmodulesQuery extends QueryEntity<SubmodulesState, Submodules[]> {

  constructor(protected store: SubmodulesStore) {
    super(store);
  }

  public get(): Observable<Submodules[]> {
    return this.selectEntity('submodules'); 
  }

}
