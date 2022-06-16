import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { InventoryDaysByClientStore } from './inventory-days-by-client.store';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { InventoryDaysByClient } from '.';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class InventoryDaysByClientService {

  readonly INVENTORY_DAYS_BY_CLIENT = 'ca/inventory-by-client/';
  subscription: Subscription;

  constructor(
    private inventoryDaysByClientStore: InventoryDaysByClientStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public get(data: FilterSelection): void {
    const url: string = environment.urlApi + this.INVENTORY_DAYS_BY_CLIENT;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.inventoryDaysByClientStore.setLoading(true);

    this.subscription = this.httpClient.get<InventoryDaysByClient[]>(url, { params })
      .subscribe((response: InventoryDaysByClient[]) => {
        result[`${data.start_date}${data.end_date}`] = response;
        this.inventoryDaysByClientStore.set(result);
        this.inventoryDaysByClientStore.setLoading(false);
      }, error => {
        result[`${data.start_date}${data.end_date}`] = [];
        this.inventoryDaysByClientStore.set(result);
        this.inventoryDaysByClientStore.setLoading(false);
      });
  }

  public unsubscribeGetInventoryDaysByClient(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
