import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { KendoModule } from '../kendo/kendo.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ConfigurationComponent } from './components/configuration.component';
import { UpdateInformationComponent } from './components/update-information/update-information.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { DownloadInformationComponent } from './components/download-information/download-information.component';
import { ProgrammedDownloadsComponent } from './components/programmed-downloads/programmed-downloads.component';
import { SendResultsComponent } from './components/send-results/send-results.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { PointsaleFormComponent } from './components/pointsale-form/pointsale-form.component';
import { TaxFormComponent } from './components/tax-form/tax-form.component';
import { MarginFormComponent } from './components/margin-form/margin-form.component';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';

@NgModule({
  declarations: [
    ConfigurationComponent,
    UpdateInformationComponent,
    ParametersComponent,
    DownloadInformationComponent,
    ProgrammedDownloadsComponent,
    SendResultsComponent,
    ProductFormComponent,
    PointsaleFormComponent,
    TaxFormComponent,
    MarginFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KendoModule,
    CoreModule,
    SharedModule.forRoot(),
    NgxPermissionsModule.forChild(),
    ConfigurationRoutingModule
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    PermissionsChartService
  ]
})
export class ConfigurationModule { }
