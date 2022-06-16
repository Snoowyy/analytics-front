import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';

import { TotalSalesComponent } from './total-sales.component';
import { TotalSale } from './state';
import { ShortNumberPipe } from 'src/app/modules/shared/pipes/short-number/short-number.pipe';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';

describe('TotalSalesComponent', () => {
  let component: TotalSalesComponent;
  let fixture: ComponentFixture<TotalSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TotalSalesComponent,
        ShortNumberPipe
      ],
      providers: [
        PermissionsChartService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSalesComponent);
    component = fixture.componentInstance;
    component.initializeTotalSales();
    fixture.detectChanges();
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('should call initializeTotalSales in ngOnChanges', () => {
    const changesObj: SimpleChanges = {
      totalSales: new SimpleChange(null, null, true)
    };
    spyOn(component, 'initializeTotalSales');
    component.ngOnChanges(changesObj);
    expect(component.initializeTotalSales).toHaveBeenCalled();
  });

  it('should call validateVariations in ngOnChanges', () => {
    const changesObj: SimpleChanges = {
      totalSales: new SimpleChange(null, {
        total: 123,
        qty: 11,
        'variation-ytd': 1,
        'variation-mtd': 0
      }, true)
    };
    spyOn(component, 'validateVariations');
    component.ngOnChanges(changesObj);
    expect(component.validateVariations).toHaveBeenCalled();
  });

  it('validateVariations()', () => {
    component.totalSales = {
      total: 123,
      qty: 11,
      'variation-ytd': 'na',
      'variation-mtd': 'na'
    };
    component.validateVariations();
    expect(component.totalSales['variation-mtd']).toEqual(null);
    expect(component.totalSales['variation-ytd']).toEqual(null);
  });

  it('should showNoResultsMessage() return boolean', () => {
    let result: boolean;
    component.isLoading = false;
    result = component.showNoResultsMessage;
    expect(result).toEqual(true);
    component.isLoading = true;
    result = component.showNoResultsMessage;
    expect(result).toEqual(false);
  });

  it('should render values', async(() => {
    const mockData: TotalSale = {
      total: 124,
      qty: 21,
      'variation-ytd': 1,
      'variation-mtd': 5
    };
    component.totalSales = mockData;
    fakeAsync(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.nativeElement.querySelector('.total').innerText).toEqual('$ 124 COP');
        expect(fixture.nativeElement.querySelector('.qty').innerText).toEqual('21 Unidades');
        expect(fixture.nativeElement.querySelector('.ytd').innerText).toEqual('1% YTD');
        expect(fixture.nativeElement.querySelector('.mtd').innerText).toEqual('5% MTD');
      });
    });  
  }));

  it('should render default values', async(() => {
    const mockData: TotalSale = {
      total: null,
      qty: null,
      'variation-ytd': null,
      'variation-mtd': null
    };
    component.totalSales = mockData;
    fakeAsync(() => {
    fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.nativeElement.querySelector('.total').innerText).toEqual('$ COP');
        expect(fixture.nativeElement.querySelector('.qty').innerText).toEqual('Unidades');
        expect(fixture.nativeElement.querySelector('.mtd').innerText).toEqual('no hay datos suficientes para mostrar la variación mensual');
        expect(fixture.nativeElement.querySelector('.ytd').innerText).toEqual('no hay datos suficientes para mostrar la variación anual');
      });
    });  
  }));

});
