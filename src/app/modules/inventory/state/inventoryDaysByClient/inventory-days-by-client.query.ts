import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { InventoryDaysByClientStore, InventoryDaysByClientState } from './inventory-days-by-client.store';
import { InventoryDaysByClient } from './inventory-days-by-client.model';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';

@Injectable({ providedIn: 'root' })
export class InventoryDaysByClientQuery extends QueryEntity<InventoryDaysByClientState, InventoryDaysByClient[]> {

  constructor(
    protected store: InventoryDaysByClientStore,
    private toCapitalCase: ToCapitalCasePipe
  ) {
    super(store);
  }

  public get(date: FilterSelection): Observable<InventoryDaysByClient[]> {
    return this.selectEntity(`${date.start_date}${date.end_date}`)
      .pipe(
        map((data: InventoryDaysByClient[]) => {
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
