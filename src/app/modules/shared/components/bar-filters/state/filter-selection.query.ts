import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { QueryEntity } from '@datorama/akita';
import { FilterSelectionStore, FilterSelectionState } from './filter-selection.store';
import { FilterSelection } from './filter-selection.model';

@Injectable({ providedIn: 'root' })
export class FilterSelectionQuery extends QueryEntity<FilterSelectionState, FilterSelection> {

  constructor(protected store: FilterSelectionStore) {
    super(store);
  }

  get(): Observable<FilterSelection> {
    return this.selectEntity('lastFilterSelected');
  }

}
