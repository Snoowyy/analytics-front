import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { BarFiltersComponent } from './bar-filters.component';
import { MultiselectFilterComponent } from '../multiselect-filter/multiselect-filter.component';
import { MultiselectQuery, Multiselect } from '../multiselect-filter/state';
import { FilterSelection, PeriodicitySelected } from './state';
import { SalesComponent } from 'src/app/modules/sales/components/sales.component';
import { DictionaryPipe } from '../../pipes/dictionary/dictionary.pipe';
import { ToCapitalCasePipe } from '../../pipes/to-capital-case/to-capital-case.pipe';
import { SeeGraphicAnalysisService } from '../../services/seeGraphicAnalysis/see-graphic-analysis.service';
import { ToMonthPipe } from '../../pipes/to-month/to-month.pipe';
import { NotificationService } from 'src/app/state/notification';
import { HeaderServices } from 'src/app/modules/core/services/header-service/header.services';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';


describe('BarFiltersComponent', () => {
  let component: BarFiltersComponent;
  let fixture: ComponentFixture<BarFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BarFiltersComponent,
        MultiselectFilterComponent,
        SalesComponent,
        DictionaryPipe
      ],
      providers: [
        HeaderServices,
        DatePipe,
        MultiselectQuery,
        DatePipe,
        ToCapitalCasePipe,
        SeeGraphicAnalysisService,
        ToMonthPipe,
        NotificationService,
        PermissionsChartService
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges() and initilizeDataRangeDates()', () => {
    const parentFixture = TestBed.createComponent(SalesComponent);
    const parentComponent = parentFixture.componentInstance;
    parentComponent.filters$ = of({ start_date: '2019-02-01', end_date: '2019-03-01' });
    spyOn(parentComponent.filterBar, 'ngOnChanges').and.callThrough();
    parentFixture.detectChanges();
    expect(parentComponent.filterBar.ngOnChanges).toHaveBeenCalled();
  });

  it('should call ngOnChanges() without initilizeDataRangeDates()', () => {
    const parentFixture = TestBed.createComponent(SalesComponent);
    const parentComponent = parentFixture.componentInstance;
    parentComponent.filters$ = of(null);
    spyOn(parentComponent.filterBar, 'ngOnChanges').and.callThrough();
    parentFixture.detectChanges();
    expect(parentComponent.filterBar.ngOnChanges).toHaveBeenCalled();
  });

  it('should emit filterSelection event', (done) => {
    const expected = undefined;
    component.filterSelection.subscribe(date => {
      expect(date).toEqual(expected);
      done();
    });
    component.ngOnInit();
  });

  it('should emit periodicitySelected event', (done) => {
    const expected = undefined;
    component.periodicitySelected.subscribe(date => {
      expect(date).toEqual(expected);
      done();
    });
    component.initilizeDataRangeDates();
    component.emitPeriodicitySelect('Anual');
  });

  it('should Periodicity have "Anual", "Mensual", "Semanal" and "Diario"', () => {
    spyOn(component, 'initializePeriodicityOptions');
    const expected: string[] = ['Anual', 'Semanal', 'Diario'];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.periodicity).toEqual(expected);
    expect(component.initializePeriodicityOptions).toHaveBeenCalled();
  });

  it('should be yearly selected period', () => {
    const expected: PeriodicitySelected = 'yearly';
    component.emitPeriodicitySelect('Anual');
    expect(component.currentSelectedPeriodicity).toEqual(expected);
  });

  it('should be weekly selected period', () => {
    const expected: PeriodicitySelected = 'weekly';
    component.emitPeriodicitySelect('Semanal');
    expect(component.currentSelectedPeriodicity).toEqual(expected);
  });

  it('should be monthly selected period', () => {
    const expected: PeriodicitySelected = 'monthly';
    component.emitPeriodicitySelect('Mensual');
    expect(component.currentSelectedPeriodicity).toEqual(expected);
  });

  it('should be daily selected period', () => {
    const expected: PeriodicitySelected = 'daily';
    component.emitPeriodicitySelect('Diario');
    expect(component.currentSelectedPeriodicity).toEqual(expected);
  });

  it('should applyFormatToDateRangeSelected() return format "yyyy-MM-dd"', () => {
    const start = new Date(2019, 1, 1);
    const end = new Date(2019, 3, 4);
    component.range = { start, end };
    const { start_date, end_date } = component.applyFormatToDateRangeSelected();
    expect(start_date).toEqual('2019-02-01');
    expect(end_date).toEqual('2019-04-04');
  });

  it('should isValidCurrentRangeDateValue() return true', () => {
    const result = component.isValidCurrentRangeDateValue();
    expect(result).toBeTruthy();
  });

  it('should isValidCurrentRangeDateValue() return false', () => {
    component.range = { start: new Date(), end: null };
    const result = component.isValidCurrentRangeDateValue();
    expect(result).toBeFalsy();
  });

  it('should initilizeDataRangeDates() set range with current days of the current month', () => {
    const currentYear = component.getCurrentYear();
    const currentMonth = component.getCurrentMonth();
    const expected = {
      start: new Date(currentYear, currentMonth, 1),
      end: new Date()
    };
    component.ngOnInit();
    expect(component.range).toEqual(expected);
  });

  it('should be executed toggleVisibilityFilterBar() function when clicking on button #toggleVisibilityFilterBar', () => {
    spyOn(component, 'toggleVisibilityFilterBar');
    const btntoggleVisibilityFilterBar = fixture.debugElement.query(By.css('#toggleVisibilityFilterBar')).nativeElement;
    btntoggleVisibilityFilterBar.click();
    fixture.detectChanges();
    expect(component.toggleVisibilityFilterBar).toHaveBeenCalled();
  });

  it('should toggleVisibilityFilterBar() change isVisibleFilterBar by !isVisibleFilterBar', () => {
    component.toggleVisibilityFilterBar();
    expect(component.isVisibleFilterBar).toBeFalsy();
    component.toggleVisibilityFilterBar();
    expect(component.isVisibleFilterBar).toBeTruthy();
  });

  describe('should getParamsForFiltersSelected() return an object with FilterSelection type params', () => {

    it('should return an object with start_date, end_date and bussiness_units array', () => {
      const dataMock: Multiselect[] = [{ gln: 450, name: 'Almacenes Exito', type: 'empresa' }];
      const { start_date, end_date } = component.applyFormatToDateRangeSelected();
      const expected: FilterSelection = {
        start_date,
        end_date,
        period: 'monthly',
        bussiness_units: [450]
      };

      component.filterMultiselect.selectedFilters = dataMock;
      const result: FilterSelection = component.getParamsForFiltersSelected();
      expect(result).toEqual(expected);
    });

    it('should return an object with start_date, end_date and glnretailerlocations array', () => {
      const dataMock: Multiselect[] = [{ gln: 22, region: 'Bogota', retailer: 2, name: 'Exito calle 45 Bogota', type: 'punto de venta' }];
      const { start_date, end_date } = component.applyFormatToDateRangeSelected();
      const expected: FilterSelection = {
        start_date,
        end_date,
        period: 'monthly',
        glnretailerlocations: [22]
      };

      component.filterMultiselect.selectedFilters = dataMock;
      const result: FilterSelection = component.getParamsForFiltersSelected();
      expect(result).toEqual(expected);
    });

    it('should return an object with start_date, end_date and region array', () => {
      const dataMock: Multiselect[] = [{ name: 'bogota', type: 'ciudad' }, { name: 'cali', type: 'ciudad' }];
      const { start_date, end_date } = component.applyFormatToDateRangeSelected();
      const expected: FilterSelection = {
        start_date,
        end_date,
        period: 'monthly',
        region: ['bogota', 'cali']
      };

      component.filterMultiselect.selectedFilters = dataMock;
      const result: FilterSelection = component.getParamsForFiltersSelected();
      expect(result).toEqual(expected);
    });

    it('should return an object with start_date, end_date and gtins array', () => {
      const dataMock: Multiselect[] = [{ gtin: 4, name: 'ESPAÑOLETAS', categories: ['Galletas', 'Colaciones', '60', ''], type: 'producto' }];
      const { start_date, end_date } = component.applyFormatToDateRangeSelected();
      const expected: FilterSelection = {
        start_date,
        end_date,
        period: 'monthly',
        gtins: [4],
      };

      component.filterMultiselect.selectedFilters = dataMock;
      const result: FilterSelection = component.getParamsForFiltersSelected();
      expect(result).toEqual(expected);
    });

    it('should return an object with start_date, end_date and glnretailer array', () => {
      const dataMock: Multiselect[] = [{ gln: 1, name: 'Grupo Exito', type: 'cliente' }, { gln: 3, name: 'Cencosud', type: 'cliente' }];
      const { start_date, end_date } = component.applyFormatToDateRangeSelected();
      const expected: FilterSelection = {
        start_date,
        end_date,
        period: 'monthly',
        glnretailer: [1, 3]
      };

      component.filterMultiselect.selectedFilters = dataMock;
      const result: FilterSelection = component.getParamsForFiltersSelected();
      expect(result).toEqual(expected);
    });
  });

});
