import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { VsComparationTimeSeriesStore, VsComparationTimeSeriesState } from './vs-comparation-time-series.store';
import { environment } from 'src/environments/environment';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class VsComparationTimeSeriesService {

  readonly SALES_VS_DAYS_INVENTORY = 'ca/inventory-vs-sales/';
  subscription: Subscription;

  constructor(
    private vsComparationTimeSeriesStore: VsComparationTimeSeriesStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public get(data: FilterSelection): void {
    const url: string = environment.urlApi + this.SALES_VS_DAYS_INVENTORY;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.vsComparationTimeSeriesStore.setLoading(true);

    this.subscription = this.httpClient.get<VsComparationTimeSeriesState[]>(url, { params })
      .subscribe((response: VsComparationTimeSeriesState) => {
        result[`salesVsInventoryDays${data.start_date}${data.end_date}${data.period}`] = response;
        this.vsComparationTimeSeriesStore.set(result);
        this.vsComparationTimeSeriesStore.setLoading(false);
      }, error => {
        result[`salesVsInventoryDays${data.start_date}${data.end_date}${data.period}`] = [];
        this.vsComparationTimeSeriesStore.set(result);
        this.vsComparationTimeSeriesStore.setLoading(false);
      });
  }

  public unsubscribeGetInventoryDaysVsSales(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
