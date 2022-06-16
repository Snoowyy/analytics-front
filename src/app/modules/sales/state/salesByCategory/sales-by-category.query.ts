import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { SalesByCategoryStore, SalesByCategoryState } from './sales-by-category.store';
import { SalesByCategory } from './sales-by-category.model';
import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';

@Injectable({ providedIn: 'root' })
export class SalesByCategoryQuery extends QueryEntity<SalesByCategoryState, SalesByCategory[]> {

  constructor(
    protected store: SalesByCategoryStore,
    private utils: UtilitiesService
  ) {
    super(store);
  }

  public get(date: FilterSelection): Observable<SalesByCategory[]> {
    return this.selectEntity(`salesByCategory${date.start_date}${date.end_date}`)
      .pipe(
        map((sales: SalesByCategory[]) => {
          if (sales)
            return sales.map(it => this.utils.normalizeItemName(it));
        })
      );
  }

  public getTop(date: FilterSelection, top: number): Observable<any[]> {
    return this.selectEntity(`salesByCategory${date.start_date}${date.end_date}`)
      .pipe(
        map((sales: SalesByCategory[]) => {
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
