import { Component, OnInit } from '@angular/core';
import {UserBussinessUnitQuery} from '../../modules/auth/state/user-business-unit';
import {HeaderServices} from '../../modules/core/services/header-service/header.services';
import {filter, map} from 'rxjs/operators';

import {Data, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Table} from '../../../vendoring/arrow-js/Arrow';
import linq, {Enumerable} from 'linq-es2015';
import {FilterSet} from '../powerbi/powerbi.component';
import {BussinessUnit} from '../../modules/auth/state/bussiness-unit';
import {DataRoute} from '../../modules/core/utils/DataRoute';
import {filterRoutesWithPrefix} from '../../modules/core/shared';


@Component({
  selector: 'app-container-powerbi',
  templateUrl: './container-powerbi.component.html',
  styleUrls: ['./container-powerbi.component.scss']
})
export class ContainerPowerbiComponent implements OnInit {

  filters$: Observable<FilterSet>;
  routes: Enumerable<DataRoute<Data>>;

  constructor(
    router: Router,
    private headerServices: HeaderServices,
    userBussinessUnitQuery: UserBussinessUnitQuery) {
    this.filters$ = userBussinessUnitQuery.bussinessUnitsByCurrentUser$.pipe(
      filter(it => it.count() > 0),
      map(this.toFilters)
    );
    this.routes = filterRoutesWithPrefix(router, '');
  }

  ngOnInit() {
    this.headerServices.setModel('assets/images/icon/promociones-icon.png', 'LOGYCA / ANALÍTICA', true);
  }

  toFilters(bussinesUnits: Table<BussinessUnit>): FilterSet {
    return {
      Productos: {
        GLNINDUSTRIAL: linq(bussinesUnits).Select(it => {
          return it.Gln.toString();
        }).ToArray()
      }
    };
  }
}


