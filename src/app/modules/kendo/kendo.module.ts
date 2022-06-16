import { NgModule } from '@angular/core';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DialogsModule, WindowModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LayoutModule, PanelBarModule } from '@progress/kendo-angular-layout';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IntlModule } from '@progress/kendo-angular-intl';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import '@progress/kendo-angular-intl/locales/es/all';

const modules = [
  DropDownsModule,
  UploadModule,
  ChartsModule,
  DialogsModule,
  DateInputsModule,
  LayoutModule,
  InputsModule,
  GridModule,
  ExcelModule,
  ExcelExportModule,
  NotificationModule,
  TooltipModule,
  PopupModule,
  ButtonsModule,
  IntlModule,
  PanelBarModule,
  ToolBarModule,
  WindowModule,
  UploadModule
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})

export class KendoModule { }
