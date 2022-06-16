import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ToCapitalCasePipe } from '../../pipes/to-capital-case/to-capital-case.pipe';
import { ToMonthPipe } from '../../pipes/to-month/to-month.pipe';
import { environment } from 'src/environments/environment';
import { FilterSelection } from '../../components/bar-filters/state';
import { SetFilterParamsService } from '../setFilterParams/set-filter-params.service';

interface Item {
  name: string;
  shortName?: string;
  sales: number;
}

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  readonly IDFILTERS = 'ca/cache-filters/';

  constructor(
    private toCapitalCasePipe: ToCapitalCasePipe,
    private toMonthPipe: ToMonthPipe,
    private httpClient: HttpClient,
    private setFilterParamsService: SetFilterParamsService
  ) { }

  public normalizeItemName(item: Item): Item {
    if (!item.name) item.name = 'sin nombre';
    item.name = this.toCapitalCasePipe.transform(item.name);
    item.shortName = (item.name.length > 28) ? `${item.name.substring(0, 12)} ...` : item.name;
    return item;
  }

  public calculateRemainingAtTop(index: number, collection: Item[]): Item {
    collection[index].shortName = 'Otros';
    collection[index].name = 'Otros';
    let total = 0;
    for (let i = index; i < collection.length; i++)
      total += collection[i].sales;
    collection[index].sales = total;
    return collection[index];
  }

  public normalizeArrayTimeSeriesByMonth(timeSeries: string[]): string[] {
    if (!timeSeries) return [];
    const regxBeforeMiddleLine = /-([^\]]+)/g;

    return timeSeries.map((item: string) => {
      const monthInDigits: string[] = item.match(regxBeforeMiddleLine);
      if (!monthInDigits) return item;
      const monthInText: string = this.toMonthPipe.transform(monthInDigits[0]);
      return item.replace(monthInDigits[0], ` ${monthInText}`);
    });
  }

  public normalizeStringTimeSeriesByMonth(timeSerie: string): string {
    const regxBeforeMiddleLine = /-([^\]]+)/g;
    const monthInDigits: string[] = timeSerie.match(regxBeforeMiddleLine);
    if (!monthInDigits) return timeSerie;
    const monthInText: string = this.toMonthPipe.transform(monthInDigits[0]);
    return timeSerie.replace(monthInDigits[0], ` ${monthInText}`);
  }

  public getRangeValuesAxisTimeSeries(lengthOfValues: number): number {
    if (lengthOfValues >= 80)
      return Math.round(lengthOfValues / 15);
    else
      return Math.round(lengthOfValues / 25);
  }

  public generateCsvContent(dataJson): any[] {
    const rows = [[], []];
    Object.keys(dataJson).forEach(key => {
      rows[0].push(key);
      rows[1].push(dataJson[key]);
    });
    return rows;
  }

  public generateCsvFile(csvContent, name): File {
    const parts = [
      new Blob([csvContent.map(e => e.join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' })
    ];
    return new File(parts, `${name}.csv`);
  }

  public getIdForCache(date: FilterSelection): Observable<{id_filter: number}> {
    const url: string = environment.urlApi + this.IDFILTERS;
    const params: HttpParams = this.setFilterParamsService.getFilterParams(date);
    return this.httpClient.get<{id_filter: number}>(url, { params });
  }

  public groupedByOthers(initialSales: { name: string, shortName?: string, sales: number }[], top: number) {
    const result = [];
    let index = 0;
    while (initialSales[0]) {
      result.push(initialSales.splice(0, top));
      let total = 0;
      initialSales.forEach(it => total += it.sales);
      if (total > 0)
        result[index].push({ shortName: 'Otros', name: 'Otros', sales: total });
      index++;
    }
    return result;
  }

}
