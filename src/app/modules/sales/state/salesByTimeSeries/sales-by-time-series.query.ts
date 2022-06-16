import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SalesByTimeSeriesStore, SalesByTimeSeriesState } from './sales-by-time-series.store';
import { SalesByTimeSeries } from './sales-by-time-series.model';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';

@Injectable({ providedIn: 'root' })
export class SalesByTimeSeriesQuery extends QueryEntity<SalesByTimeSeriesState, SalesByTimeSeries> {

  constructor(
    protected store: SalesByTimeSeriesStore,
    private utilitiesService: UtilitiesService
  ) {
    super(store);
  }

  public get(date: FilterSelection): Observable<SalesByTimeSeries> {
    return this.selectEntity(`${date.start_date}${date.end_date}${date.period}`)
      .pipe(
        map((sales: SalesByTimeSeries) => {
          if (sales) {
            if (date.period === 'monthly')
              sales.time_series = this.utilitiesService.normalizeArrayTimeSeriesByMonth(sales.time_series);
            return sales;
          }
        })
      );
  }

}
