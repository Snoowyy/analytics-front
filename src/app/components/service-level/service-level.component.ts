import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { Enumerable } from 'linq-es2015';
import { NotificationService } from '@progress/kendo-angular-notification';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { HeaderServices } from 'src/app/modules/core/services/header-service/header.services';
import { DataRoute } from 'src/app/modules/core/utils/DataRoute';
import { filterRoutesWithPrefix } from 'src/app/modules/core/shared';
import * as dataMock from 'src/app/faker-data/data.faker';

@Component({
  selector: 'cvn-service-level',
  templateUrl: './service-level.component.html',
  styleUrls: ['./service-level.component.scss']
})
export class ServiceLevelComponent implements OnInit {

  routes: Enumerable<DataRoute<Data>>;
  public data;
  public visible = true;
  public opened = false;
  public stateCausalManager: State = { skip: 0, take: 5 };
  public allocationOptionsState: State = { skip: 0, take: 5 };
  public gridData: GridDataResult;
  public causalManagerData: GridDataResult;

  constructor(
    router: Router,
    private headerServices: HeaderServices,
    private notificationService: NotificationService
  ) {
    this.routes = filterRoutesWithPrefix(router, '');
  }

  ngOnInit() {
    this.headerServices.setModel('assets/images/icon/promociones-icon.png', 'LOGYCA / ANALÍTICA', true);
    this.data = dataMock;
    this.causalManagerData = process(this.data.causalManager, this.stateCausalManager);
    this.gridData = process(this.data.allocationOptions, this.allocationOptionsState);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.stateCausalManager = state;
    this.causalManagerData = process(this.data.causalManager, this.stateCausalManager);
  }

  public dataStateChangeCausal(state: DataStateChangeEvent): void {
    this.allocationOptionsState = state;
    this.gridData = process(this.data.allocationOptions, this.allocationOptionsState);
  }

  public close(status) {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }

}
