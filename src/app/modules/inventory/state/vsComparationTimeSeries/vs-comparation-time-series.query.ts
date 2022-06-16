import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryEntity } from '@datorama/akita';
import { VsComparationTimeSeriesStore, VsComparationTimeSeriesState } from './vs-comparation-time-series.store';
import { VsComparationTimeSeries } from './vs-comparation-time-series.model';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';

@Injectable({ providedIn: 'root' })
export class VsComparationTimeSeriesQuery extends QueryEntity<VsComparationTimeSeriesState, VsComparationTimeSeries> {

  constructor(
    protected store: VsComparationTimeSeriesStore,
    private utilitiesService: UtilitiesService
  ) {
    super(store);
  }

  public get(date: FilterSelection): Observable<VsComparationTimeSeries> {
    return this.selectEntity(`salesVsInventoryDays${date.start_date}${date.end_date}${date.period}`)
    .pipe(
      map((item: VsComparationTimeSeries) => {
        if (!item) return null;
        if (date.period === 'monthly')
          item.time_series = this.utilitiesService.normalizeArrayTimeSeriesByMonth(item.time_series);
        if (item.data) {
          if (item.data.length === 2) {
            item.data[0].axis = 'mpg';
            item.data[0].color = '#E74C3C';
            item.data[0].type = 'line';
            item.data[1].color = '#F1C40F';
            item.data[1].axis = 'ventas';
            item.axis = [
              { name: 'mpg', title: 'Inventario (dias)', color: '#E74C3C' },
              { name: 'ventas', title: 'Ventas (pesos)', color: '#F1C40F' }
            ];
          }
        }
        return item;
      })
    );
  }
}
