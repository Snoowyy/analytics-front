import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PriceSensitivityTimeSeriesComponent } from './price-sensitivity-time-series.component';
import { priceSensitivity } from '../../fake-data/fake-data';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';
import { ToMonthPipe } from 'src/app/modules/shared/pipes/to-month/to-month.pipe';

describe('PriceSensitivityTimeSeriesComponent', () => {
  let component: PriceSensitivityTimeSeriesComponent;
  let fixture: ComponentFixture<PriceSensitivityTimeSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriceSensitivityTimeSeriesComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DecimalPipe, ToCapitalCasePipe, ToMonthPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceSensitivityTimeSeriesComponent);
    component = fixture.componentInstance;
    component.graphData = priceSensitivity;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializeDataGraph() assign [] to graphData', () => {
    const expected = {
      categories: [],
      elasticity: null,
      time_series: [],
      data: [],
      axis: []
    };
    component.initializeDataGraph();
    expect(component.graphData).toEqual(expected);
  });

  it('should hasResults be true', () => {
    const mock = { time_series: ['Enero', 'Febrero']};
    const changesObj: SimpleChanges = {
      graphData: new SimpleChange(null, mock, true)
    };
    component.ngOnChanges(changesObj);
    expect(component.hasResults).toBeTruthy();
  });

  it('should hasResults be false', () => {
    const mock = { time_series: [] };
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
