import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NotificationService } from '@progress/kendo-angular-notification';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StockoutComponent } from './stockout.component';
import { HeaderServices } from '../../core/services/header-service/header.services';
import { ToCapitalCasePipe } from '../../shared/pipes/to-capital-case/to-capital-case.pipe';
import { SeeGraphicAnalysisService } from '../../shared/services/seeGraphicAnalysis/see-graphic-analysis.service';
import { ToMonthPipe } from '../../shared/pipes/to-month/to-month.pipe';
import { DictionaryPipe } from '../../shared/pipes/dictionary/dictionary.pipe';

describe('StockoutComponent', () => {
  let component: StockoutComponent;
  let fixture: ComponentFixture<StockoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockoutComponent, DictionaryPipe],
      imports: [RouterTestingModule, HttpClientTestingModule, LeafletModule],
      providers: [
        HeaderServices,
        DatePipe,
        ToCapitalCasePipe,
        SeeGraphicAnalysisService,
        ToMonthPipe,
        NotificationService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
