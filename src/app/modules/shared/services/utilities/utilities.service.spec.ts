import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UtilitiesService } from './utilities.service';
import { ToCapitalCasePipe } from '../../pipes/to-capital-case/to-capital-case.pipe';
import { ToMonthPipe } from '../../pipes/to-month/to-month.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UtilitiesService', () => {
  let service: UtilitiesService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ToCapitalCasePipe, ToMonthPipe]
  }));

  beforeEach(() => {
    service = TestBed.get(UtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calcule remaining at top 1', () => {
    const expected = { name: 'Otros', shortName: 'Otros', sales: 652 };
    const mock = [
      { name: '1', shortName: '1', sales: 2 },
      { name: '2', shortName: '2', sales: 100 },
      { name: '3', shortName: '3', sales: 500 },
      { name: '4', shortName: '4', sales: 50 }
    ];

    const result = service.calculateRemainingAtTop(0, mock);
    expect(result).toEqual(expected);
  });

  it('calcule remaining at top 3', () => {
    const expected = { name: 'Otros', shortName: 'Otros', sales: 550 };
    const mock = [
      { name: '1', shortName: '1', sales: 2 },
      { name: '2', shortName: '2', sales: 100 },
      { name: '3', shortName: '3', sales: 500 },
      { name: '4', shortName: '4', sales: 50 }
    ];

    const result = service.calculateRemainingAtTop(2, mock);
    expect(result).toEqual(expected);
  });

  it('calcule remaining at top 4', () => {
    const expected = { name: 'Otros', shortName: 'Otros', sales: 50 };
    const mock = [
      { name: '1', shortName: '1', sales: 2 },
      { name: '2', shortName: '2', sales: 100 },
      { name: '3', shortName: '3', sales: 500 },
      { name: '4', shortName: '4', sales: 50 }
    ];

    const result = service.calculateRemainingAtTop(3, mock);
    expect(result).toEqual(expected);
  });

  describe('normalize timeSeries by Month', () => {

    it('should normalizeArrayTimeSeriesByMonth() return [] valid', () => {
      const expected = [
        '2018 diciembre',
        '2019 enero',
        '2019 febrero',
        '2019 marzo',
        '2019 abril',
        '2019 mayo',
        '2019 junio',
        '2019 julio',
        '2019 agosto',
        '2019 septiembre',
        '2019 octubre',
        '2019 noviembre'
      ];
      const mock = ['2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07', '2019-08', '2019-09', '2019-10', '2019-11'];

      const result = service.normalizeArrayTimeSeriesByMonth(mock);
      expect(result).toEqual(expected);
    });

    it('should normalizeStringTimeSeriesByMonth() return string valid', () => {
      const expected = '2019 febrero';
      const mock = '2019-02';

      const result = service.normalizeStringTimeSeriesByMonth(mock);
      expect(result).toEqual(expected);
    });
  });
});
