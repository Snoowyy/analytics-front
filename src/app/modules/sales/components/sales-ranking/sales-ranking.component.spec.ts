import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SalesRankingComponent } from './sales-ranking.component';
import { salesRanking } from '../../fake-data/fake-data';
import { SalesRanking } from '../../state/salesRanking';

describe('SalesRankingComponent', () => {
  let component: SalesRankingComponent;
  let fixture: ComponentFixture<SalesRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesRankingComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRankingComponent);
    component = fixture.componentInstance;
    component.graphData = salesRanking;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializeDataGraph() assign [] to graphData', () => {
    const expected: SalesRanking = { name: '', sales: [] };
    component.initializeDataGraph();
    expect(component.graphData).toEqual(expected);
  });

  it('should hasResults be true', () => {
    const mock: SalesRanking = { name: 'ventas', sales: [{ name: 'Ramo', value: 12965 }]};
    const changesObj: SimpleChanges = {
      graphData: new SimpleChange(null, mock, true)
    };
    component.ngOnChanges(changesObj);
    expect(component.hasResults).toBeTruthy();
  });

  it('should hasResults be false', () => {
    const mock: SalesRanking = { name: 'ventas', sales: [] };
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
