import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { SalesBehaviorStore } from './sales-behavior.store';
import { SalesBehavior } from './sales-behavior.model';
import { environment } from 'src/environments/environment';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';
@Injectable({ providedIn: 'root' })
export class SalesBehaviorService {

  readonly SALES_BEHAVIOR = 'ca/sales-by-provider-category/';
  subscription: Subscription;

  constructor(
    private salesBehaviorStore: SalesBehaviorStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public getSalesBehaviorByCategory(data: FilterSelection): void {
    const url: string = environment.urlApi + this.SALES_BEHAVIOR;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);

    this.salesBehaviorStore.setLoading(true);
    const currentBusinessLevel = this.getCurrentBusinessLevel(data);

    this.subscription = this.httpClient.get<SalesBehavior>(url, { params })
      .subscribe((response: SalesBehavior) => {
        result[`salesBehaviorByCategory${data.start_date}${data.end_date}`] = response;
        localStorage.setItem('currentBusinessLevelColumn', JSON.stringify(currentBusinessLevel));
        this.salesBehaviorStore.set(result);
        this.salesBehaviorStore.setLoading(false);
      }, error => {
        result[`salesBehaviorByCategory${data.start_date}${data.end_date}`] = [];
        this.salesBehaviorStore.set(result);
        this.salesBehaviorStore.setLoading(false);
      });
  }

  public getCurrentBusinessLevel(data: FilterSelection): number {
    let result = 0;
    if (data.bussiness_level1) result = 1;
    if (data.bussiness_level2) result = 2;
    if (data.bussiness_level3) result = 3;
    return result;
  }

  public unsubscribeGetSalesBehavior(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
