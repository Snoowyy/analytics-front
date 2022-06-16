import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { InventoryDaysByCategoryStore } from './inventory-days-by-category.store';
import { environment } from 'src/environments/environment';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { InventoryDaysByCategory } from '.';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class InventoryDaysByCategoryService {

  readonly INVENTORY_DAYS_BY_CATEGORY = 'ca/inventory-by-bussiness-level/';
  subscription: Subscription;

  constructor(
    private inventoryDaysByCategoryStore: InventoryDaysByCategoryStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public get(data: FilterSelection): void {
    const url: string = environment.urlApi + this.INVENTORY_DAYS_BY_CATEGORY;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.inventoryDaysByCategoryStore.setLoading(true);

    this.subscription = this.httpClient.get<InventoryDaysByCategory[]>(url, { params })
      .subscribe((response: InventoryDaysByCategory[]) => {
        result[`${data.start_date}${data.end_date}`] = response;
        this.inventoryDaysByCategoryStore.set(result);
        this.inventoryDaysByCategoryStore.setLoading(false);
      }, error => {
        result[`${data.start_date}${data.end_date}`] = [];
        this.inventoryDaysByCategoryStore.set(result);
        this.inventoryDaysByCategoryStore.setLoading(false);
      });
  }

  public unsubscribeGetInventoryDaysByCategory(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
