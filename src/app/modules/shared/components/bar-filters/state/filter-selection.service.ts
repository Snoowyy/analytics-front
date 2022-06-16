import { Injectable } from '@angular/core';
import { FilterSelectionStore } from './filter-selection.store';

@Injectable({ providedIn: 'root' })
export class FilterSelectionService {

  constructor(private filterSelectionStore: FilterSelectionStore) {
  }

}
