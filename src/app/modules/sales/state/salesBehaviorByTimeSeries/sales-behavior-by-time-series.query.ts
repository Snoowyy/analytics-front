import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SalesBehaviorByTimeSeriesStore, SalesBehaviorByTimeSeriesState } from './sales-behavior-by-time-series.store';
import { SalesBehaviorByTimeSeries } from './sales-behavior-by-time-series.model';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';

@Injectable({ providedIn: 'root' })
export class SalesBehaviorByTimeSeriesQuery extends QueryEntity<SalesBehaviorByTimeSeriesState, SalesBehaviorByTimeSeries[]> {

  constructor(
    protected store: SalesBehaviorByTimeSeriesStore,
    private utilitiesService: UtilitiesService
  ) {
    super(store);
  }

  public get(date: FilterSelection): Observable<SalesBehaviorByTimeSeries[]> {
    return this.selectEntity(`${date.start_date}${date.end_date}`)
      .pipe(
        map((sales: SalesBehaviorByTimeSeries[]) => {
          if (sales) {
            if (date.period === 'monthly') {
              sales.forEach((sale: SalesBehaviorByTimeSeries, index: number, collection: SalesBehaviorByTimeSeries[]) => {
                collection[index].date = this.utilitiesService.normalizeStringTimeSeriesByMonth(sale.date);
              });
            }
            return sales;
          }
        })
      );
  }

}
