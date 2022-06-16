import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SalesBehaviorTimeSeriesComponent } from './sales-behavior-time-series.component';
import { salesMaxMin } from '../../fake-data/fake-data';
import { ToCapitalCasePipe } from 'src/app/modules/shared/pipes/to-capital-case/to-capital-case.pipe';
import { ToMonthPipe } from 'src/app/modules/shared/pipes/to-month/to-month.pipe';

describe('SalesBehaviorTimeSeriesComponent', () => {
  let component: SalesBehaviorTimeSeriesComponent;
  let fixture: ComponentFixture<SalesBehaviorTimeSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesBehaviorTimeSeriesComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ToCapitalCasePipe, ToMonthPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesBehaviorTimeSeriesComponent);
    component = fixture.componentInstance;
    component.graphData = salesMaxMin;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializeDataGraph() assign [] to graphData', () => {
    component.initializeDataGraph();
    expect(component.graphData).toEqual([]);
  });

  it('should hasResults be true', () => {
    const mock = [{
      lower: 2,
      q1: 3,
      median: 4,
      q3: 1,
      upper: 5,
      mean: -2,
      outliers: [-1, 0, 1, 2],
      date: '2019-01-01'
    }];
    const changesObj: SimpleChanges = {
      graphData: new SimpleChange(null, mock, true)
    };
    component.ngOnChanges(changesObj);
    expect(component.hasResults).toBeTruthy();
  });

  it('should hasResults be false', () => {
    const mock = [];
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
