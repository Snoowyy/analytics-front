import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SalesByClientStore, SalesByClientState } from './sales-by-client.store';
import { SalesByClient } from './sales-by-client.model';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';

@Injectable({ providedIn: 'root' })
export class SalesByClientQuery extends QueryEntity<SalesByClientState, SalesByClient[]> {

  constructor(
    protected store: SalesByClientStore,
    private utils: UtilitiesService
  ) {
    super(store);
  }

  public get(date: FilterSelection): Observable<SalesByClient[]> {
    return this.selectEntity(`salesByClient${date.start_date}${date.end_date}`)
      .pipe(
        map((sales: SalesByClient[]) => {
          if (sales)
            return sales.map(it => this.utils.normalizeItemName(it));
        })
      );
  }

  public getTop(date: FilterSelection, top: number): Observable<any[]> {
    return this.selectEntity(`salesByClient${date.start_date}${date.end_date}`)
      .pipe(
        map((sales: SalesByClient[]) => {
          if (sales) {
            const initialSales = sales.slice(0);
            initialSales.map(it => {
              return this.utils.normalizeItemName(it);
            });
            return this.utils.groupedByOthers(initialSales, top);
          }
        })
      );
  }

}
