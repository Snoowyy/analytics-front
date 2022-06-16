import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GroupResult } from '@progress/kendo-data-query';

import { MultiselectFilterComponent } from './multiselect-filter.component';
import { Multiselect } from './state';
import { OthersFilterSelection } from '../bar-filters/state';
import { multiselectFilter } from 'src/app/faker-data/data.faker';

describe('MultiselectFilterComponent', () => {
  let component: MultiselectFilterComponent;
  let fixture: ComponentFixture<MultiselectFilterComponent>;
  const fakeData: Multiselect[] = multiselectFilter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectFilterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectFilterComponent);
    component = fixture.componentInstance;
    component.selectedFilters = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be 0 the options initially selected', () => {
    const expected = 0;
    expect(component.selectedFilters.length).toEqual(expected);
  });

  it('should change the selected options', () => {
    const initialValue = component.selectedFilters;

    component.selectedFilters = [{ name: 'ventas', type: 'custom' }];
    fixture.detectChanges();
    expect(component.selectedFilters.length).toEqual(1);
    expect(initialValue).not.toEqual(component.selectedFilters);
  });

  it('should onChangeInputText() filter and group the options', () => {
    const expected: GroupResult[] | Multiselect[] = [
      {
        aggregates: {},
        field: 'type',
        items: [{ gln: 5, name: 'Flamingo', type: 'client' }],
        value: 'client'
      },
      {
        aggregates: {},
        field: 'type',
        items: [{ gln: 28, region: 'Cali', retailer: 5, name: 'Flamingo centro mayor', type: 'pv' }],
        value: 'pv'
      }
    ];

    component.options = fakeData;
    component.onChangeInputText('flami');
    const result = component.groupedOptions;
    expect(result.length).toEqual(2);
    expect(result).toEqual(expected);
  });

  it('should emit selectFilter event of type FilterSelected', (done) => {
    const selectedFilters: Multiselect[] = [{
      gln: 22,
      region: 'Bogota',
      retailer: 1,
      name: 'Exito calle 45 Bogota',
      type: 'pv'
    }];

    component.options = fakeData;
    component.selectFilter.subscribe(() => {
      const result = 1;
      expect(result).toBeTruthy();
      done();
    });
    component.onSelectOption(selectedFilters);
  });

  describe('should convertFiltersToRequestParams() return an object with OthersFilterSelection type params array', () => {

    it('should return an object of arrays where only bussiness_units has values', () => {
      const dataMock: Multiselect[] = [{ gln: 450, name: 'Almacenes Exito', type: 'empresa' }];
      const expected: OthersFilterSelection = {
        bussiness_units: [450]
      };

      component.selectedFilters = dataMock;
      const result: OthersFilterSelection = component.convertFiltersToRequestParams();
      expect(result).toEqual(expected);
    });

    it('should return an object of arrays where only glnretailerlocations has values', () => {
      const dataMock: Multiselect[] = [{ gln: 22, region: 'Bogota', retailer: 1, name: 'Exito calle 45 Bogota', type: 'punto de venta' }];
      const expected: OthersFilterSelection = {
        glnretailerlocations: [22],
      };

      component.selectedFilters = dataMock;
      const result: OthersFilterSelection = component.convertFiltersToRequestParams();
      expect(result).toEqual(expected);
    });

    it('should return an object of arrays where only region has values', () => {
      const dataMock: Multiselect[] = [{ name: 'bogota', type: 'ciudad' }, { name: 'cali', type: 'ciudad' }];

      const expected: OthersFilterSelection = {
        region: ['bogota', 'cali']
      };

      component.selectedFilters = dataMock;
      const result: OthersFilterSelection = component.convertFiltersToRequestParams();
      expect(result).toEqual(expected);
    });

    it('should return an object of arrays where only gtins has values', () => {
      const dataMock: Multiselect[] = [{ gtin: 4, name: 'ESPAÑOLETAS', categories: ['Galletas', 'Colaciones', '60', ''], type: 'producto' }];
      const expected: OthersFilterSelection = {
        gtins: [4],
      };

      component.selectedFilters = dataMock;
      const result: OthersFilterSelection = component.convertFiltersToRequestParams();
      expect(result).toEqual(expected);
    });

    it('should return an object of arrays where only glnretailer has values', () => {
      const dataMock: Multiselect[] = [{ gln: 1, name: 'Grupo Exito', type: 'cliente' }, { gln: 3, name: 'Cencosud', type: 'cliente' }];
      const expected: OthersFilterSelection = {
        glnretailer: [1, 3],
      };

      component.selectedFilters = dataMock;
      const result: OthersFilterSelection = component.convertFiltersToRequestParams();
      expect(result).toEqual(expected);
    });

    describe('businessLevel', () => {
      it('should return an object of arrays where only businessLevel has values and level 1', () => {
        const dataMock: Multiselect[] = [{ name: 'Pasabocas', type: 'categoria de producto', levels: ['Pasabocas', 'Maizitos', '360', ''] }];
        const expected: OthersFilterSelection = {
          bussiness_level1: 'Pasabocas'
        };

        component.selectedFilters = dataMock;
        const result: OthersFilterSelection = component.convertFiltersToRequestParams();
        expect(result).toEqual(expected);
      });

      it('should return an object of arrays where only businessLevel has values and level 2', () => {
        const dataMock: Multiselect[] = [{ name: 'Maizitos', type: 'categoria de producto', levels: ['Pasabocas', 'Maizitos', '360', ''] }];
        const expected: OthersFilterSelection = {
          bussiness_level1: 'Pasabocas',
          bussiness_level2: 'Maizitos'
        };

        component.selectedFilters = dataMock;
        const result: OthersFilterSelection = component.convertFiltersToRequestParams();
        expect(result).toEqual(expected);
      });

      it('should return an object of arrays where only businessLevel has values and level 3', () => {
        const dataMock: Multiselect[] = [{ name: '360', type: 'categoria de producto', levels: ['Pasabocas', 'Maizitos', '360', ''] }];
        const expected: OthersFilterSelection = {
          bussiness_level1: 'Pasabocas',
          bussiness_level2: 'Maizitos',
          bussiness_level3: '360'
        };

        component.selectedFilters = dataMock;
        const result: OthersFilterSelection = component.convertFiltersToRequestParams();
        expect(result).toEqual(expected);
      });

      it('should return an object of arrays where only businessLevel has values and level 4', () => {
        const dataMock: Multiselect[] = [{ name: '22', type: 'categoria de producto', levels: ['Pasabocas', 'Maizitos', '360', '22'] }];
        const expected: OthersFilterSelection = {
          bussiness_level1: 'Pasabocas',
          bussiness_level2: 'Maizitos',
          bussiness_level3: '360',
          bussiness_level4: '22'
        };

        component.selectedFilters = dataMock;
        const result: OthersFilterSelection = component.convertFiltersToRequestParams();
        expect(result).toEqual(expected);
      });

      it('should be executed getCategoryLevelsInProduct() and return object BusinessLevels type', () => {
        const dataMock: Multiselect[] = [{ name: 'Redondos', type: 'categoria de producto', levels: ['Ponques', 'Redondos', 'Medianos', 'Ramo redondo x 6'] }];
        const expected: OthersFilterSelection = {
          bussiness_level1: 'Ponques',
          bussiness_level2: 'Redondos'
        };

        spyOn(component, 'getCategoryLevelsInProduct').and.returnValues(expected);
        component.selectedFilters = dataMock;
        const result: OthersFilterSelection = component.convertFiltersToRequestParams();
        expect(component.getCategoryLevelsInProduct).toHaveBeenCalled();
      });
    });

    describe('retailerLevels', () => {
      it('should return an object of arrays where only retailer-level has values and level 1', () => {
        const dataMock: Multiselect[] = [{ name: 'SUPERMERCADO', type: 'categoria de punto de venta', levels: ['SUPERMERCADO', '7', '6', '1'] }];
        const expected: OthersFilterSelection = {
          'retailer-level1': 'SUPERMERCADO'
        };

        component.selectedFilters = dataMock;
        const result: OthersFilterSelection = component.convertFiltersToRequestParams();
        expect(result).toEqual(expected);
      });

      it('should return an object of arrays where only retailer-level has values and level 2', () => {
        const dataMock: Multiselect[] = [{ name: '7', type: 'categoria de punto de venta', levels: ['SUPERMERCADO', '7', '6', '1'] }];
        const expected: OthersFilterSelection = {
          'retailer-level1': 'SUPERMERCADO',
          'retailer-level2': '7'
        };

        component.selectedFilters = dataMock;
        const result: OthersFilterSelection = component.convertFiltersToRequestParams();
        expect(result).toEqual(expected);
      });

      it('should return an object of arrays where only retailer-level has values and level 3', () => {
        const dataMock: Multiselect[] = [{ name: '6', type: 'categoria de punto de venta', levels: ['SUPERMERCADO', '7', '6', '1'] }];
        const expected: OthersFilterSelection = {
          'retailer-level1': 'SUPERMERCADO',
          'retailer-level2': '7',
          'retailer-level3': '6'
        };

        component.selectedFilters = dataMock;
        const result: OthersFilterSelection = component.convertFiltersToRequestParams();
        expect(result).toEqual(expected);
      });

      it('should return an object of arrays where only retailer-level has values and level 4', () => {
        const dataMock: Multiselect[] = [{ name: '1', type: 'categoria de punto de venta', levels: ['SUPERMERCADO', '7', '6', '1'] }];
        const expected: OthersFilterSelection = {
          'retailer-level1': 'SUPERMERCADO',
          'retailer-level2': '7',
          'retailer-level3': '6',
          'retailer-level4': '1'
        };

        component.selectedFilters = dataMock;
        const result: OthersFilterSelection = component.convertFiltersToRequestParams();
        expect(result).toEqual(expected);
      });

      it('should be executed getCategoryLevelsInPointsSale() and return object retailer-level type', () => {
        const dataMock: Multiselect[] = [{ name: '6', type: 'categoria de punto de venta', levels: ['SUPERMERCADO', '7', '6', '1'] }];
        const expected: OthersFilterSelection = {
          'retailer-level1': 'SUPERMERCADO',
          'retailer-level2': '7',
          'retailer-level3': '6'
        };

        spyOn(component, 'getCategoryLevelsInPointsSale').and.returnValues(expected);
        component.selectedFilters = dataMock;
        const result: OthersFilterSelection = component.convertFiltersToRequestParams();
        expect(component.getCategoryLevelsInPointsSale).toHaveBeenCalled();
      });
    });
  });
});
