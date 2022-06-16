import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { SalesByClientStore } from './sales-by-client.store';
import { SalesByClient } from './sales-by-client.model';
import { environment } from 'src/environments/environment';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class SalesByClientService {

  readonly SALES_BY_CLIENT = 'ca/sales-by-client/';
  public subscription: Subscription;

  constructor(
    private salesByClientStore: SalesByClientStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public getSalesByClient(data: FilterSelection): void {
    const url: string = environment.urlApi + this.SALES_BY_CLIENT;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.salesByClientStore.setLoading(true);

    this.subscription = this.httpClient.get<SalesByClient[]>(url, { params })
      .subscribe((response: SalesByClient[]) => {
        result[`salesByClient${data.start_date}${data.end_date}`] = response;
        this.salesByClientStore.set(result);
        this.salesByClientStore.setLoading(false);
      }, error => {
        result[`salesByClient${data.start_date}${data.end_date}`] = [];
        this.salesByClientStore.set(result);
        this.salesByClientStore.setLoading(false);
      });
  }

  public unsubscribeGetSalesByClient(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
