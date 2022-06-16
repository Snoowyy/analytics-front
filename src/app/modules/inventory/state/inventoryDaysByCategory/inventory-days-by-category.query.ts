import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { InventoryDaysByCategoryStore, InventoryDaysByCategoryState } from './inventory-days-by-category.store';
import { InventoryDaysByCategory } from './inventory-days-by-category.model';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';

@Injectable({ providedIn: 'root' })
export class InventoryDaysByCategoryQuery extends QueryEntity<InventoryDaysByCategoryState, InventoryDaysByCategory[]> {

  constructor(
    protected store: InventoryDaysByCategoryStore,
    private toCapitalCase: ToCapitalCasePipe
  ) {
    super(store);
  }

  public get(date: FilterSelection): Observable<InventoryDaysByCategory[]> {
    return this.selectEntity(`${date.start_date}${date.end_date}`)
      .pipe(
        map((data: InventoryDaysByCategory[]) => {
          if (data) {
            return data.map(it => {
              if (!it.name) it.name = 'sin nombre';
              it.name = this.toCapitalCase.transform(it.name);
              it.shortName = (it.name.length > 10) ? `${ it.name.substring(0, 10)} ...` : it.name;
              return it;
            });
          }
        })
      );
  }

}
