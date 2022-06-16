import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { VsCompareTimeSeriesComponent } from './vs-compare-time-series.component';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';
import { ToMonthPipe } from 'src/app/modules/shared/pipes/to-month/to-month.pipe';
import { VsComparationTimeSeries } from '../../state/vsComparationTimeSeries';

describe('VsCompareTimeSeriesComponent', () => {
  let component: VsCompareTimeSeriesComponent;
  let fixture: ComponentFixture<VsCompareTimeSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VsCompareTimeSeriesComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule],
      providers: [DecimalPipe, ToCapitalCasePipe, ToMonthPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsCompareTimeSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializeDataGraph() assign {} to graphData', () => {
    const expected = {
      time_series: [],
      data: [],
      categories: [],
      axis: []
    };
    component.initializeDataGraph();
    expect(component.graphData).toEqual(expected);
  });

  it('should hasResults be true', () => {
    const mock: VsComparationTimeSeries = {
      categories: ['Inventarios', 'Ventas'],
      time_series: ['2019-01'],
      data: [],
      axis: []
    };
    const changesObj: SimpleChanges = {
      graphData: new SimpleChange(null, mock, true)
    };
    component.ngOnChanges(changesObj);
    expect(component.hasResults).toBeFalsy();
  });

  it('should hasResults be false', () => {
    const mock: VsComparationTimeSeries = {
      categories: [],
      time_series: [],
      data: [],
      axis: []
    };
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
