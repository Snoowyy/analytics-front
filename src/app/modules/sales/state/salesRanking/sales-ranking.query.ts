import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryEntity } from '@datorama/akita';
import { SalesRankingStore, SalesRankingState } from './sales-ranking.store';
import { SalesRanking } from './sales-ranking.model';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';

@Injectable({ providedIn: 'root' })
export class SalesRankingQuery extends QueryEntity<SalesRankingState, SalesRanking> {

  constructor(
    protected store: SalesRankingStore,
    private toCapitalCase: ToCapitalCasePipe
  ) {
    super(store);
  }

  public get(date: FilterSelection): Observable<SalesRanking> {
    return this.selectEntity(`salesRanking${date.start_date}${date.end_date}`)
      .pipe(
        map((data: SalesRanking) => {
          if (data) {
            data.sales.forEach(it => {
              if (!it.name) it.name = 'sin nombre';
              it.name = this.toCapitalCase.transform(it.name);
              it.shortName = (it.name.length > 12) ? `${ it.name.substring(0, 12)} ...` : it.name;
            });
            return data;
          }
        })
      );
  }

}
