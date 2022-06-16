import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { SalesByTimeSeriesStore } from './sales-by-time-series.store';
import { SalesByTimeSeries } from './sales-by-time-series.model';
import { environment } from 'src/environments/environment';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class SalesByTimeSeriesService {

  readonly SALES_TIME_SERIES = 'ca/sales-by-client-ts/';
  subscription: Subscription;

  constructor(
    private salesByTimeSeriesStore: SalesByTimeSeriesStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public getSalesByTimeSeries(data: FilterSelection): void {
    const url: string = environment.urlApi + this.SALES_TIME_SERIES;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.salesByTimeSeriesStore.setLoading(true);

    this.subscription = this.httpClient.get<SalesByTimeSeries>(url, { params })
      .subscribe((response: SalesByTimeSeries) => {
        result[`${data.start_date}${data.end_date}${data.period}`] = response;
        this.salesByTimeSeriesStore.set(result);
        this.salesByTimeSeriesStore.setLoading(false);
      }, error => {
        result[`${data.start_date}${data.end_date}${data.period}`] = false;
        this.salesByTimeSeriesStore.set(result);
        this.salesByTimeSeriesStore.setLoading(false);
      });
  }

  public unsubscribeGetSalesByTimeSeries(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
