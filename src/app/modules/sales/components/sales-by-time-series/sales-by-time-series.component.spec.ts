import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SalesByTimeSeriesComponent } from './sales-by-time-series.component';
import { monthlySaleByCient } from '../../fake-data/fake-data';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';
import { ToMonthPipe } from 'src/app/modules/shared/pipes/to-month/to-month.pipe';
import { SalesByTimeSeries } from '../../state/salesByTimeSeries';

describe('SalesByTimeSeriesComponent', () => {
  let component: SalesByTimeSeriesComponent;
  let fixture: ComponentFixture<SalesByTimeSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesByTimeSeriesComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ToCapitalCasePipe, ToMonthPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesByTimeSeriesComponent);
    component = fixture.componentInstance;
    component.graphData = monthlySaleByCient;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializeDataGraph() assign [] to graphData', () => {
    const expected: SalesByTimeSeries = { time_series: [], data: [] };
    component.initializeDataGraph();
    expect(component.graphData).toEqual(expected);
  });

  it('should hasResults be true', () => {
    const mock: SalesByTimeSeries = {
      time_series: ['2019-01-01', '2019-02-01'],
      data: []
    };
    const changesObj: SimpleChanges = {
      graphData: new SimpleChange(null, mock, true)
    };
    component.ngOnChanges(changesObj);
    expect(component.hasResults).toBeTruthy();
  });

  it('should hasResults be false', () => {
    const mock: SalesByTimeSeries = { time_series: [], data: []};
    const changesObj: SimpleChanges = {
      graphData: new SimpleChange(null, mock, true)
    };
    component.initializeDataGraph();
    component.ngOnChanges(changesObj);
    expect(component.hasResults).toBeFalsy();
  });

  it('should call ngOnChanges without graphData', () => {
    const mock = null;
    const changesObj: SimpleChanges = {
      graphData: new SimpleChange(null, mock, true)
    };
    spyOn(component, 'initializeDataGraph');
    component.ngOnChanges(changesObj);
    expect(component.initializeDataGraph).toHaveBeenCalled();
  });
});
