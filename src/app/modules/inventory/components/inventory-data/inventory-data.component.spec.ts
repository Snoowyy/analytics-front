import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { InventoryDataComponent } from './inventory-data.component';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';
import { ShortNumberPipe } from 'src/app/modules/shared/pipes/short-number/short-number.pipe';
import { Inventory } from '../../state/inventory';
import { PermissionsChartService } from 'src/app/services/permissions-charts/permissions-charts.service';

describe('InventoryDataComponent', () => {
  let component: InventoryDataComponent;
  let fixture: ComponentFixture<InventoryDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InventoryDataComponent,
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
    fixture = TestBed.createComponent(InventoryDataComponent);
    component = fixture.componentInstance;
    component.initializeData();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initializeData in ngOnChanges', () => {
    const changesObj: SimpleChanges = {
      data: new SimpleChange(null, null, true)
    };
    spyOn(component, 'initializeData');
    component.ngOnChanges(changesObj);
    expect(component.initializeData).toHaveBeenCalled();
  });

  it('should call validateVariations in ngOnChanges', () => {
    const expected: Inventory = {
      last_inventory_qty: 0,
      last_inventory_total: 0,
      average_sale_qty: 0,
      average_sale_total: 0,
      inventory_days: 0
    };
    const changesObj: SimpleChanges = {
      data: new SimpleChange(null, null, true)
    };
    component.ngOnChanges(changesObj);
    expect(component.data).toEqual(expected);
  });

  it('should render values', async(() => {
    const mockData: Inventory = {
      last_inventory_qty: 12456,
      last_inventory_total: 21387997,
      average_sale_qty: 2657,
      average_sale_total: 12538078,
      inventory_days: 186
    };
    component.data = mockData;
    fakeAsync(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.nativeElement.querySelector('.lastQty').innerText).toEqual('12,456 Unidades');
        expect(fixture.nativeElement.querySelector('.lastTotal').innerText).toEqual('$ 21,387,997 COP');
        expect(fixture.nativeElement.querySelector('.averageQty').innerText).toEqual('2,657 Unidades');
        expect(fixture.nativeElement.querySelector('.averageTotal').innerText).toEqual('$ 12,538,078 COP');
        expect(fixture.nativeElement.querySelector('.daysQty').innerText).toEqual('186');
      });
    });
  }));

  it('should render default values', async(() => {
    const mockData: Inventory = {
      last_inventory_qty: null,
      last_inventory_total: null,
      average_sale_qty: null,
      average_sale_total: null,
      inventory_days: null
    };
    component.data = mockData;
    fakeAsync(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.nativeElement.querySelector('.lastQty').innerText).toEqual('Unidades');
        expect(fixture.nativeElement.querySelector('.lastTotal').innerText).toEqual('$ COP');
        expect(fixture.nativeElement.querySelector('.averageQty').innerText).toEqual('Unidades');
        expect(fixture.nativeElement.querySelector('.averageTotal').innerText).toEqual('$ COP');
        expect(fixture.nativeElement.querySelector('.daysQty').innerText).toEqual('86');
      });
    });
  }));
});
