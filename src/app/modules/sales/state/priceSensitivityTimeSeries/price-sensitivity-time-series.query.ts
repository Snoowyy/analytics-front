import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryEntity } from '@datorama/akita';
import { PriceSensitivityTimeSeriesStore, PriceSensitivityTimeSeriesState } from './price-sensitivity-time-series.store';
import { PriceSensitivityTimeSeries } from './price-sensitivity-time-series.model';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';

@Injectable({ providedIn: 'root' })
export class PriceSensitivityTimeSeriesQuery extends QueryEntity<PriceSensitivityTimeSeriesState, PriceSensitivityTimeSeries> {

  constructor(
    protected store: PriceSensitivityTimeSeriesStore,
    private utilitiesService: UtilitiesService
  ) {
    super(store);
  }

  get(date: FilterSelection): Observable<PriceSensitivityTimeSeries> {
    return this.selectEntity(`${date.start_date}${date.end_date}${date.period}`)
      .pipe(
        map((item: PriceSensitivityTimeSeries) => {
          if (!item) return null;
          if (date.period === 'monthly')
            item.time_series = this.utilitiesService.normalizeArrayTimeSeriesByMonth(item.time_series);
          if (item.data) {
            if (item.data.length === 2) {
              item.data[0].color = '#F1C40F';
              item.data[0].axis = 'ventas';
              item.data[1].color = '#E74C3C';
              item.data[1].axis = 'mpg';
              item.data[1].type = 'line';
              item.axis = [
                { name: 'mpg', title: 'Precio Promedio x Unidad (pesos)', color: '#E74C3C' },
                { name: 'ventas', title: 'Ventas (unidades)', color: '#F1C40F' }
              ];
            }
          }
          return item;
        })
      );
  }

}
