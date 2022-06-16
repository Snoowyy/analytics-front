import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TotalSalesStore } from './total-sales.store';
import { TotalSale } from './total-sale.model';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';
@Injectable({ providedIn: 'root' })
export class TotalSalesService {

  readonly TOTAL_SALES = 'ca/sales/';
  public subscription: Subscription;

  constructor(
    private totalSalesStore: TotalSalesStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  getTotalSales(data: FilterSelection): void {
    const url: string = environment.urlApi + this.TOTAL_SALES;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.totalSalesStore.setLoading(true);

    this.subscription = this.httpClient.get<TotalSale>(url, { params })
      .subscribe((response: TotalSale) => {
        result[`totalSales${data.start_date}${data.end_date}`] = response;
        this.totalSalesStore.set(result);
        this.totalSalesStore.setLoading(false);
      }, error => {
        result[`totalSales${data.start_date}${data.end_date}`] = false;
        this.totalSalesStore.set(result);
        this.totalSalesStore.setLoading(false);
      });
  }

  public unsubscribeGetTotalSales(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
