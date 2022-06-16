import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { QueryEntity } from '@datorama/akita';
import { RankingPointsSaleStore, RankingPointsSaleState } from './ranking-points-sale.store';
import { RankingPointsSale } from './ranking-points-sale.model';
import { FilterSelection } from 'src/app/modules/shared/components/bar-filters/state';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';

@Injectable({ providedIn: 'root' })
export class RankingPointsSaleQuery extends QueryEntity<RankingPointsSaleState, RankingPointsSale> {

  constructor(
    protected store: RankingPointsSaleStore,
    private toCapitalCase: ToCapitalCasePipe
  ) {
    super(store);
  }

  public get(date: FilterSelection) {
    return this.selectEntity(`${date.start_date}${date.end_date}`)
      .pipe(
        map((data: RankingPointsSale) => {
          if (data) {
            data.sales = data.sales || [];
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
