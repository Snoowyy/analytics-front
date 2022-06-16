import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../shared/shared.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './components/inventory.component';
import { KendoModule } from '../kendo/kendo.module';
import { CoreModule } from '../core/core.module';
import { InventoryDataComponent } from './components/inventory-data/inventory-data.component';
import { InventoryDaysComponent } from './components/inventory-days/inventory-days.component';
import { VsCompareTimeSeriesComponent } from './components/vs-compare-time-series/vs-compare-time-series.component';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';

@NgModule({
  declarations: [
    InventoryComponent,
    InventoryDataComponent,
    InventoryDaysComponent,
    VsCompareTimeSeriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    KendoModule,
    CoreModule,
    SharedModule.forRoot(),
    NgxPermissionsModule.forChild(),
    InventoryRoutingModule
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    PermissionsChartService
  ]
})
export class InventoryModule { }
