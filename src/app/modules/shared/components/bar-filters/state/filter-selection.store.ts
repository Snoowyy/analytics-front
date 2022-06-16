import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { FilterSelection } from './filter-selection.model';

export interface FilterSelectionState extends EntityState<FilterSelection> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'filterSelection' })
export class FilterSelectionStore extends EntityStore<FilterSelectionState, FilterSelection> {

  constructor() {
    super();
  }

  public setLastFilterSelected(params: FilterSelection) {
    const entities: any = {};
    const { start_date, end_date } = params;
    entities['lastFilterSelected'] = { start_date, end_date };
    this.set(entities);
  }

}
