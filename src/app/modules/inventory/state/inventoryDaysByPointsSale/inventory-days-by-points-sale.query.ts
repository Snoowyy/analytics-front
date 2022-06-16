import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { InventoryDaysByPointsSaleStore, InventoryDaysByPointsSaleState } from './inventory-days-by-points-sale.store';
import { InventoryDaysByPointsSale } from './inventory-days-by-points-sale.model';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';

@Injectable({ providedIn: 'root' })
export class InventoryDaysByPointsSaleQuery extends QueryEntity<InventoryDaysByPointsSaleState, InventoryDaysByPointsSale[]> {

  constructor(
    protected store: InventoryDaysByPointsSaleStore,
    private toCapitalCase: ToCapitalCasePipe
  ) {
    super(store);
  }

  public get(date: FilterSelection): Observable<InventoryDaysByPointsSale[]> {
    return this.selectEntity(`${date.start_date}${date.end_date}`)
      .pipe(
        map((data: InventoryDaysByPointsSale[]) => {
          if (data) {
            return data.map(it => {
              if (!it.name) it.name = 'sin nombre';
              it.name = this.toCapitalCase.transform(it.name);
              it.shortName = (it.name.length > 12) ? `${ it.name.substring(0, 12)} ...` : it.name;
              return it;
            });
          }
        })
      );
  }

}
