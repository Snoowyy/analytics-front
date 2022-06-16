import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { InventoryStore } from './inventory.store';
import { Inventory } from './inventory.model';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class InventoryService {

  readonly TOTAL_SALES = 'ca/inventory/';
  subscription: Subscription;

  constructor(
    private inventoryStore: InventoryStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) {}

  public get(data: FilterSelection): void {
    const url: string = environment.urlApi + this.TOTAL_SALES;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.inventoryStore.setLoading(true);

    this.subscription = this.httpClient.get<Inventory>(url, { params })
      .subscribe((response: Inventory) => {
        result[`inventory${data.start_date}${data.end_date}`] = response;
        this.inventoryStore.set(result);
        this.inventoryStore.setLoading(false);
      }, error => {
        result[`inventory${data.start_date}${data.end_date}`] = false;
        this.inventoryStore.set(result);
        this.inventoryStore.setLoading(false);
      });
  }

  public unsubscribeGetInventory(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
