import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';

import { InventoryDaysComponent } from './inventory-days.component';
import { inventoryDaysByClient } from 'src/app/faker-data/data.faker';
import { InventoryDaysByClient } from '../../state/inventoryDaysByClient';

describe('InventoryDaysComponent', () => {
  let component: InventoryDaysComponent;
  let fixture: ComponentFixture<InventoryDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryDaysComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDaysComponent);
    component = fixture.componentInstance;
    component.graphData = inventoryDaysByClient;
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
    const mock: InventoryDaysByClient[] = [{ name: 'Product 1', value: 12345 }];
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
