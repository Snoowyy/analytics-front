import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPermissionsModule } from 'ngx-permissions';
import { KendoModule } from '../kendo/kendo.module';
import { GraphicTitleComponent } from './components/graphic-title/graphic-title.component';
import { BarFiltersComponent } from './components/bar-filters/bar-filters.component';
import { GraphicPinComponent } from './components/graphic-pin/graphic-pin.component';
import { MultiselectFilterComponent } from './components/multiselect-filter/multiselect-filter.component';
import { ShortNumberPipe } from './pipes/short-number/short-number.pipe';
import { DictionaryPipe } from './pipes/dictionary/dictionary.pipe';
import { ToCapitalCasePipe } from './pipes/to-capital-case/to-capital-case.pipe';
import { UtilitiesService } from './services/utilities/utilities.service';
import { SeeGraphicAnalysisService } from './services/seeGraphicAnalysis/see-graphic-analysis.service';
import { SetFilterParamsService } from './services/setFilterParams/set-filter-params.service';
import { ToMonthPipe } from './pipes/to-month/to-month.pipe';

@NgModule({
  declarations: [
    BarFiltersComponent,
    GraphicTitleComponent,
    GraphicPinComponent,
    MultiselectFilterComponent,
    ShortNumberPipe,
    DictionaryPipe,
    ToCapitalCasePipe,
    ToMonthPipe
  ],
  imports: [
    CommonModule,
    KendoModule,
    NgxPermissionsModule.forRoot()
  ],
  exports: [
    BarFiltersComponent,
    GraphicTitleComponent,
    GraphicPinComponent,
    MultiselectFilterComponent,
    ShortNumberPipe,
    ToCapitalCasePipe,
    DictionaryPipe,
    ToMonthPipe,
    NgxPermissionsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        UtilitiesService,
        SeeGraphicAnalysisService,
        SetFilterParamsService,
        ToMonthPipe,
        ToCapitalCasePipe
      ]
    };
  }
}
