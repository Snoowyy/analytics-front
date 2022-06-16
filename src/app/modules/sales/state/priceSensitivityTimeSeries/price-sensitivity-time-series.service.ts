import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { PriceSensitivityTimeSeriesStore } from './price-sensitivity-time-series.store';
import { PriceSensitivityTimeSeries } from './price-sensitivity-time-series.model';
import { environment } from 'src/environments/environment';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class PriceSensitivityTimeSeriesService {

  readonly PRICE_SENSITIVITY = 'ca/sales-price-sensitivity/';
  public subscription: Subscription;

  constructor(
    private priceSensitivityTimeSeriesStore: PriceSensitivityTimeSeriesStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public getPriceSencitivity(data: FilterSelection): void {
    const url: string = environment.urlApi + this.PRICE_SENSITIVITY;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.priceSensitivityTimeSeriesStore.setLoading(true);

    this.subscription = this.httpClient.get<PriceSensitivityTimeSeries>(url, { params })
      .subscribe((response: PriceSensitivityTimeSeries) => {
        result[`${data.start_date}${data.end_date}${data.period}`] = response;
        this.priceSensitivityTimeSeriesStore.set(result);
        this.priceSensitivityTimeSeriesStore.setLoading(false);
      }, error => {
        result[`${data.start_date}${data.end_date}${data.period}`] = false;
        this.priceSensitivityTimeSeriesStore.set(result);
        this.priceSensitivityTimeSeriesStore.setLoading(false);
      });
  }

  public unsubscribeGetPriceSencitivity(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
