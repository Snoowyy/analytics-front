import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SalesRankingStore } from './sales-ranking.store';
import { SalesRanking } from './sales-ranking.model';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';

@Injectable({ providedIn: 'root' })
export class SalesRankingService {

  readonly SALES_RANKING = 'ca/sales-products-rank/';
  subscription: Subscription;

  constructor(
    private salesRankingStore: SalesRankingStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public getSalesRanking(data: FilterSelection): void {
    const url: string = environment.urlApi + this.SALES_RANKING;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.salesRankingStore.setLoading(true);

    this.subscription = this.httpClient.get<SalesRanking>(url, { params })
      .subscribe((response: SalesRanking) => {
        result[`salesRanking${data.start_date}${data.end_date}`] = response;
        this.salesRankingStore.set(result);
        this.salesRankingStore.setLoading(false);
      }, error => {
        result[`salesRanking${data.start_date}${data.end_date}`] = false;
        this.salesRankingStore.set(result);
        this.salesRankingStore.setLoading(false);
      });
  }

  public unsubscribeGetProductSalesRanking(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
