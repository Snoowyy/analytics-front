import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SalesByComponent } from './sales-by.component';
import { ChangeLevel } from '../../sales.model';

describe('SalesByComponent', () => {
  let component: SalesByComponent;
  let fixture: ComponentFixture<SalesByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesByComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesByComponent);
    component = fixture.componentInstance;
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
    const mock = [[{ name: 'Product 1', sales: 12345 }]];
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

  describe('navigation by categories levels', () => {

    it('should be executed goToNextCategoryLevel() function', () => {
      const mock = { category: 'galletas' };
      spyOn(component, 'goToNextCategoryLevel');
      component.onSeriesClick(mock);
      expect(component.goToNextCategoryLevel).toHaveBeenCalled();
      expect(component.goToNextCategoryLevel).toHaveBeenCalledWith(mock.category);
    });

    it('should be executed goToPreviousCategoryLevel() function when clicking on button #previousLevel', () => {
      spyOn(component, 'goToPreviousCategoryLevel');
      component.currentBusinessLevel = 1;
      const btnpreviousLevel = fixture.debugElement.query(By.css('#previousLevel')).nativeElement;
      btnpreviousLevel.click();
      fixture.detectChanges();
      expect(component.goToPreviousCategoryLevel).toHaveBeenCalled();
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

    it('should be return ChangeLevel object goToNextCategoryLevel()', (done) => {
      const mock = 'galletas';
      const expected: ChangeLevel = {
        data: [{ name: 'galletas', level: 1 }],
        type: 'donnut'
      };
      component.changeLevel.subscribe((response: ChangeLevel) => {
        expect(response).toEqual(expected);
        done();
      });
      component.goToNextCategoryLevel(mock);
    });
  });

  describe('navigation by category others for donnuts graph', () => {
    it('should be executed goToNextGraphdataLevel() function', () => {
      const mock = { category: 'Otros' };
      spyOn(component, 'goToNextGraphdataLevel');
      component.onSeriesClick(mock);
      expect(component.goToNextGraphdataLevel).toHaveBeenCalled();
    });

    it('should increment and decrement currentGraphdataLevel', () => {
      const mock = [[{ name: 'Product 1', sales: 12345 }]];
      component.graphDataClone = mock;
      expect(component.currentGraphdataLevel).toEqual(0);
      component.goToNextGraphdataLevel();
      expect(component.currentGraphdataLevel).toEqual(1);
      component.goToPreviousGraphdataLevel();
      expect(component.currentGraphdataLevel).toEqual(0);
    });

    it('should be executed goToPreviousGraphdataLevel() function when clicking on button #previousOthers', () => {
      spyOn(component, 'goToPreviousGraphdataLevel');
      component.currentGraphdataLevel = 1;
      const btnpreviousLevel = fixture.debugElement.query(By.css('#previousOthers')).nativeElement;
      btnpreviousLevel.click();
      fixture.detectChanges();
      expect(component.goToPreviousGraphdataLevel).toHaveBeenCalled();
    });
  });

  it('labelContent()', () => {
    const mock = { category: 'Papas', value: 2452 };
    const expected = `Papas: \n 2452`;
    const result = component.labelContent(mock);
    expect(result).toEqual(expected);
  });

});
