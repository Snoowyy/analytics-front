import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { SalesByCategoryStore } from './sales-by-category.store';
import { SalesByCategory } from './sales-by-category.model';
import { environment } from 'src/environments/environment';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class SalesByCategoryService {

  readonly SALES_BY_CATEGORY = 'ca/sales-by-provider-category/';
  subscription: Subscription;

  constructor(
    private salesByCategoryStore: SalesByCategoryStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public getSalesByCategory(data: FilterSelection): void {
    const url: string = environment.urlApi + this.SALES_BY_CATEGORY;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.salesByCategoryStore.setLoading(true);
    const currentBusinessLevel = this.getCurrentBusinessLevel(data);

    this.subscription = this.httpClient.get<SalesByCategory[]>(url, { params })
      .subscribe((response: SalesByCategory[]) => {
        result[`salesByCategory${data.start_date}${data.end_date}`] = response;
        localStorage.setItem('currentBusinessLevelDonnut', JSON.stringify(currentBusinessLevel));
        this.salesByCategoryStore.set(result);
        this.salesByCategoryStore.setLoading(false);
      }, error => {
        result[`salesByCategory${data.start_date}${data.end_date}`] = [];
        this.salesByCategoryStore.set(result);
        this.salesByCategoryStore.setLoading(false);
      });
  }

  public getCurrentBusinessLevel(data: FilterSelection): number {
    let result = 0;
    if (data.bussiness_level1) result = 1;
    if (data.bussiness_level2) result = 2;
    if (data.bussiness_level3) result = 3;
    return result;
  }

  public unsubscribeGetSalesByCategory(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
