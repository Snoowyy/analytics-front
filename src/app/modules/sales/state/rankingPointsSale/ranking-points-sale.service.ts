import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RankingPointsSaleStore } from './ranking-points-sale.store';
import { SetFilterParamsService } from 'src/app/modules/shared/services/setFilterParams/set-filter-params.service';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { RankingPointsSale } from '.';

@Injectable({ providedIn: 'root' })
export class RankingPointsSaleService {

  readonly SALES_RANKING = 'ca/sales-retailerlocation-rank/';
  subscription: Subscription;

  constructor(
    private rankingPointsSaleStore: RankingPointsSaleStore,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public get(data: FilterSelection): void {
    const url: string = environment.urlApi + this.SALES_RANKING;
    const result = {};
    const params: HttpParams = this.setFilterParamsService.getFilterParams(data);
    this.rankingPointsSaleStore.setLoading(true);

    this.subscription = this.httpClient.get<RankingPointsSale>(url, { params })
      .subscribe((response: RankingPointsSale) => {
        result[`${data.start_date}${data.end_date}`] = response;
        this.rankingPointsSaleStore.set(result);
        this.rankingPointsSaleStore.setLoading(false);
      }, error => {
        result[`${data.start_date}${data.end_date}`] = false;
        this.rankingPointsSaleStore.set(result);
        this.rankingPointsSaleStore.setLoading(false);
      });
  }

  public unsubscribeGetRankingPointsSale(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
