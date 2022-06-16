import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { NgLetDirective } from './directives/ngLet';
import { NavComponent } from './components/nav/nav.component';
import { ImportsComponent, UploadInterceptor } from './components/imports/imports.component';
import { RouterModule } from '@angular/router';
import { TripTableService, VehicleCategoryTableService, BussinessVehicleTypeTableService, VehicleTypeTableService, FuelTypeTableService, CityTableService, DeliveryTableService, LocationTableService, UploadedFileTableService, UploadedFileService } from './state/core';
import { HeaderServices } from './services/header-service/header.services';
import { CvnCacheService } from './services/cvn-cache/cvn-cache.service';
import { VehicleTableService } from './state/core/vehicle/vehicle.data.service';
import { StandardCategoryTableService } from './state/core/standard-category/standard-category.data.service';
import { PanelNotificationsComponent } from './components/panel-notifications/panel-notifications.component';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { UploadModule } from '@progress/kendo-angular-upload';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBoxComponent } from './components/loading-box/loading-box.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LocationKindTableService } from './state/core/location-kind/location-kind.data.service';

export const ROOT_INJECTOR_CORE_PROVIDERS = [
  TripTableService,
  HeaderServices,
  CvnCacheService,
  UploadedFileService,
  BussinessVehicleTypeTableService,
  UploadedFileTableService,
  VehicleCategoryTableService,
  VehicleTypeTableService,
  VehicleTableService,
  FuelTypeTableService,
  CityTableService,
  StandardCategoryTableService,
  DeliveryTableService,
  LocationTableService,
  LocationKindTableService
];

@NgModule({
  imports: [
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ToolBarModule,
    PanelBarModule,
    ButtonsModule,
    DialogModule,
    TooltipModule,
    NotificationModule,
    UploadModule,
    GridModule
  ],
  declarations: [
    LoadingComponent,
    ImportsComponent,
    NavComponent,
    NgLetDirective,
    PanelNotificationsComponent,
    LoadingBoxComponent,
  ],
  exports: [
    LoadingComponent,
    NavComponent,
    ImportsComponent,
    NgLetDirective,
    PanelNotificationsComponent,
    LoadingBoxComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
