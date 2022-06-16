import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

import { InventoryDaysByPointsSaleStore } from './inventory-days-by-points-sale.store';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { InventoryDaysByPointsSale } from '.';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class InventoryDaysByPointsSaleService {

  readonly INVENTORY_DAYS_BY_POINTS_SALE = 'ca/inventory-by-retailer-location/';
  subscription: Subscription;

  constructor(
    private inventoryDaysByPointsSaleStore: InventoryDaysByPointsSaleStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public get(data: FilterSelection): void {
    const url: string = environment.urlApi + this.INVENTORY_DAYS_BY_POINTS_SALE;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.inventoryDaysByPointsSaleStore.setLoading(true);

    this.subscription = this.httpClient.get<InventoryDaysByPointsSale[]>(url, { params })
      .subscribe((response: InventoryDaysByPointsSale[]) => {
        result[`${data.start_date}${data.end_date}`] = response;
        this.inventoryDaysByPointsSaleStore.set(result);
        this.inventoryDaysByPointsSaleStore.setLoading(false);
      }, error => {
        result[`${data.start_date}${data.end_date}`] = [];
        this.inventoryDaysByPointsSaleStore.set(result);
        this.inventoryDaysByPointsSaleStore.setLoading(false);
      });
  }

  public unsubscribeGetInventoryDaysByPointsSale(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}

