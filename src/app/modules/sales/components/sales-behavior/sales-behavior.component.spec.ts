import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SalesBehaviorComponent } from './sales-behavior.component';
import { salesBehavior } from '../../fake-data/fake-data';
import { ChangeLevel } from '../../sales.model';

describe('SalesBehaviorComponent', () => {
  let component: SalesBehaviorComponent;
  let fixture: ComponentFixture<SalesBehaviorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesBehaviorComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesBehaviorComponent);
    component = fixture.componentInstance;
    component.graphData = salesBehavior;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize graphData []', () => {
    const expected = [];
    component.initializeDataGraph();
    expect(component.graphData).toEqual(expected);
  });

  it('should hasResults be true', () => {
    const mock = [{ name: 'Product 1', sales: 12345 }];
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

  it('should changeLevel emit empty array', (done) => {
    const expected: ChangeLevel = { data: [], type: 'column' };

    component.changeLevel.subscribe((result: ChangeLevel) => {
      expect(result).toEqual(expected);
      done();
    });
    component.goToPreviousCategoryLevel();
  });

  it('should goToPreviousCategoryLevel emit up to level 2 from level 3', (done) => {
    const expected: ChangeLevel = {
      data: [{ name: 'Ponque', level: 1 }, { name: 'Ramo', level: 2 }],
      type: 'column'
    };
    const mock: ChangeLevel = {
      data: [
        { name: 'Ponque', level: 1 },
        { name: 'Ramo', level: 2 },
        { name: 'Redondo', level: 3 }
      ],
      type: 'column'
    };

    component.filtersBusinessLevel = mock;
    component.currentBusinessLevel = 3;
    component.changeLevel.subscribe((result: ChangeLevel) => {
      expect(result).toEqual(expected);
      done();
    });
    component.goToPreviousCategoryLevel();
  });

  it('should goToPreviousCategoryLevel emit up to initial level from level 1', (done) => {
    const expected: ChangeLevel = { data: [], type: 'column' };
    const mock: ChangeLevel = {
      data: [{ name: 'Ponque', level: 1 }],
      type: 'column'
    };

    component.filtersBusinessLevel = mock;
    component.currentBusinessLevel = 1;
    component.changeLevel.subscribe((result: ChangeLevel) => {
      expect(result).toEqual(expected);
      done();
    });
    component.goToPreviousCategoryLevel();
  });

  it('should be executed goToPreviousCategoryLevel() functon when the button #previousLevel is clicked', () => {
    spyOn(component, 'goToPreviousCategoryLevel');
    const btnGoToPreviousLevel = fixture.debugElement.query(By.css('#previousLevel')).nativeElement;
    btnGoToPreviousLevel.click();
    fixture.detectChanges();
    expect(component.goToPreviousCategoryLevel).toHaveBeenCalled();
  });

  it('should be return ChangeLevel object goToNextCategoryLevel()', (done) => {
    const mock = { category: 'galletas' };
    const expected: ChangeLevel = {
      data: [{ name: 'galletas', level: 1 }],
      type: 'column'
    };
    component.changeLevel.subscribe((response: ChangeLevel) => {
      expect(response).toEqual(expected);
      done();
    });
    component.goToNextCategoryLevel(mock);
  });

  it('should return true isValidLevel() functon', () => {
    const result = component.isValidLevel(0);
    expect(result).toBeTruthy();
  });

  it('should return true isValidLevel() functon', () => {
    const result = component.isValidLevel(2);
    expect(result).toBeTruthy();
  });

  it('should return true isValidLevel() false', () => {
    const result = component.isValidLevel(3);
    expect(result).toBeFalsy();
  });
});
