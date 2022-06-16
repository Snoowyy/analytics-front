import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';
import { NotificationService } from '@progress/kendo-angular-notification';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SalesComponent } from './sales.component';
import { HeaderServices } from 'src/app/modules/core/services/header-service/header.services';
import { SeeGraphicAnalysisService } from 'src/app/modules/shared/services/seeGraphicAnalysis/see-graphic-analysis.service';
import { DictionaryPipe } from 'src/app/modules/shared/pipes/dictionary/dictionary.pipe';
import { ToCapitalCasePipe } from '../../shared/pipes/to-capital-case/to-capital-case.pipe';
import { ToMonthPipe } from '../../shared/pipes/to-month/to-month.pipe';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';

describe('SalesComponent', () => {
  let component: SalesComponent;
  let fixture: ComponentFixture<SalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesComponent, DictionaryPipe],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        HeaderServices,
        DatePipe,
        ToCapitalCasePipe,
        SeeGraphicAnalysisService,
        ToMonthPipe,
        NotificationService,
        PermissionsChartService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
