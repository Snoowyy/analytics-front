import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';
import { KendoModule } from '../kendo/kendo.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';
import { TotalSalesComponent } from './components/total-sales/total-sales.component';
import { SalesByComponent } from './components/sales-by/sales-by.component';
import { SalesRankingComponent } from './components/sales-ranking/sales-ranking.component';
import { SalesByTimeSeriesComponent } from './components/sales-by-time-series/sales-by-time-series.component';
import { SalesBehaviorTimeSeriesComponent } from './components/sales-behavior-time-series/sales-behavior-time-series.component';
import { SalesBehaviorComponent } from './components/sales-behavior/sales-behavior.component';
import { SalesComponent } from './components/sales.component';
import { PriceSensitivityTimeSeriesComponent } from './components/price-sensitivity-time-series/price-sensitivity-time-series.component';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';

@NgModule({
  declarations: [
    SalesComponent,
    TotalSalesComponent,
    SalesByComponent,
    SalesRankingComponent,
    SalesByTimeSeriesComponent,
    SalesBehaviorTimeSeriesComponent,
    SalesBehaviorComponent,
    PriceSensitivityTimeSeriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    KendoModule,
    CoreModule,
    SharedModule.forRoot(),
    NgxPermissionsModule.forChild(),
    SalesRoutingModule
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    PermissionsChartService
  ]
})
export class SalesModule { }
