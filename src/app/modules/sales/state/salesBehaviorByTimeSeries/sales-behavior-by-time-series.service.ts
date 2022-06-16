import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { SalesBehaviorByTimeSeriesStore } from './sales-behavior-by-time-series.store';
import { SalesBehaviorByTimeSeries } from './sales-behavior-by-time-series.model';
import { environment } from 'src/environments/environment';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class SalesBehaviorByTimeSeriesService {

  readonly SALES_BEHAVIOR = 'ca/sales-behavior-ts/';
  subscription: Subscription;

  constructor(
    private salesBehaviorByTimeSeriesStore: SalesBehaviorByTimeSeriesStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public getSalesBehavior(data: FilterSelection): void {
    const url: string = environment.urlApi + this.SALES_BEHAVIOR;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.salesBehaviorByTimeSeriesStore.setLoading(true);

    this.subscription = this.httpClient.get<SalesBehaviorByTimeSeries[]>(url, { params })
      .subscribe((response: SalesBehaviorByTimeSeries[]) => {
        result[`${data.start_date}${data.end_date}`] = response;
        this.salesBehaviorByTimeSeriesStore.set(result);
        this.salesBehaviorByTimeSeriesStore.setLoading(false);
      }, error => {
        result[`${data.start_date}${data.end_date}`] = [];
        this.salesBehaviorByTimeSeriesStore.set(result);
        this.salesBehaviorByTimeSeriesStore.setLoading(false);
      });
  }

  public unsubscribeGetSalesBehavior(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
