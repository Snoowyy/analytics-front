import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { shareReplay, switchMap, map } from 'rxjs/operators';
import { State, FilterDescriptor } from '@progress/kendo-data-query';
import { EventEmitter } from '@angular/core';
import { StructData, StructValue } from 'src/vendoring/arrow-js/type';
import { StructDataSet, TableSetData } from 'src/app/shared/models/types';
import { NestedArrowValues } from 'src/app/shared/models/_shared_';
import * as lf from 'lodash/fp';
import { Observable } from 'rxjs';
import { deserializeTableSet } from 'src/app/shared/TableSetUtils';
import { createFormData } from 'src/app/shared/util';

export type KendoStringOperator = 'startswith' | 'endswith' | 'contains' | 'doesnotcontain'
  | 'isempty' | 'isnotempty';

export type KendoOperator = 'eq' | 'neq' | 'isnull' | 'isnotnull'
  | 'lt' | 'lte' | 'gt' | 'gte' | KendoStringOperator;

function getOperator(operator: KendoOperator, ignoreCase: boolean) {
  if (ignoreCase) {
    switch (operator as KendoStringOperator) {
      case 'contains': return '__icontains=';
      case 'doesnotcontain': return '__icontains!=';
      case 'endswith': return '__iendswith=';
      case 'startswith': return '__istartswith=';
      default: throw Error('La api de Django no soporta filtros con el operador ' + operator);
    }
  }

  switch (operator) {
    case 'contains':
    case 'endswith':
    case 'gt':
    case 'gte':
    case 'lt':
    case 'lte':
    case 'startswith':
      return '__' + operator + '=';

    case 'doesnotcontain':
      return '__contains!=';

    case 'eq':
      return '=';
    case 'neq':
      return '!=';

    default:
      throw Error('La api de Django no soporta filtros con el operador ' + operator);
  }
}

function getFilterParam(f: FilterDescriptor): string {
  const { operator, ignoreCase } = f;
  if (typeof (operator) === 'function') {
    throw Error('No se soportan funciones de ordenamiento en la api genérica de Django');
  }
  return f.field + getOperator(<KendoOperator>operator, ignoreCase) + f.value;
}

function getDjangoUrlParams(state?: State, options?: any): string {

  if (!state && !options) {
    return '';
  }

  const params = <any>{};

  if (state) {
    if (state.skip) {
      params.offset = state.skip;
    }

    if (state.take) {
      params.limit = state.take;
    }
  }

  if (options) {
    if (typeof (options.limit) !== 'undefined') {
      params.limit = options.limit;
    }
    if (typeof (options.offset) !== 'undefined') {
      params.offset = options.offset;
    }

    if (options.extra_fields) {
      params.$include_extra = (<string[]>options.extra_fields).join('|');
    }
  }

  if (state && state.sort) {
    let ordering = '';
    for (const s of state.sort) {
      if (s.dir === 'asc') {
        ordering += s.field;
      } else if (s.dir === 'desc') {
        ordering += '-' + s.field;
      }
    }
    if (ordering) {
      params.ordering = ordering;
    }
  }

  let paramsStr = new HttpParams({ fromObject: params }).toString();

  if (state && state.filter) {
    if (state.filter.logic === 'or') {
      throw Error('No se soportan disyunciones de filtros');
    }

    let p = '';
    for (const f of state.filter.filters) {
      if ((<any>f).logic) {
        throw Error('No se soportan filtros anidados.');
      }
      if (p.length !== 0) {
        p += '&';
      }
      p += getFilterParam(<FilterDescriptor>f);
    }
    if (paramsStr.length !== 0) {
      paramsStr += '&';
    }
    paramsStr += p;
  }

  return '?' + paramsStr;
}

export interface DjangoPagedRestResponse<T extends StructData, P extends StructDataSet = {}> {
  count: number;
  next: string;
  previus: string;
  results: (StructValue<T> & NestedArrowValues<P>)[];
}



export type WithRoot<T extends StructData, P extends StructDataSet = {}> = P & { '$root': T };
export type TableSetWithRoot<T extends StructData, P extends StructDataSet = {}> = TableSetData<WithRoot<T, P>>;

export enum AcceptsMimeType {
  tableset = 'application/x-cvn-arrow-tableset',
  json = 'application/json'
}

export type DjangoRestResponse<T extends StructData, P extends StructDataSet = {}>
  = (StructValue<T> & NestedArrowValues<P>)[];

// tslint:disable-next-line:interface-over-type-literal
type Filters = {};

export function getState(filters: Filters = {}, state: State = {}) {
  return lf.merge(state, <State>{
    filter: {
      filters: Object.entries(filters)
        .filter(it => it[1] !== null && typeof it[1] !== 'undefined')
        .map(it => <FilterDescriptor>({
          field: it[0],
          operator: 'eq',
          value: it[1]
        }))
    }
  });
}

export interface OptionsExtras {
  extra_fields: string[];
}

export interface OptionsPaging {
  limit: number;
  offset: number;
}

export type Options = OptionsExtras & OptionsPaging;
export type AnyOptions = OptionsExtras | OptionsPaging | Options;

type ReturnsType<T extends StructData, P extends StructDataSet = {}>
  = DjangoPagedRestResponse<T, P> | DjangoRestResponse<T, P>
  | TableSetWithRoot<T, P>;

export abstract class GenericTableService<T extends StructData> {
  endpoint: string;
  constructor(
    public http: HttpClient,
    public viewset: string,
  ) { }

  setEndpoint(ep: string) {
    this.endpoint = ep;
  }

  getEndpoint() {
    return (this.endpoint ? environment.urls[this.endpoint] : environment.gatewayUrl);
  }


  public list<P extends StructDataSet = {}>(state: State, options?: OptionsPaging, accepts?: AcceptsMimeType.json)
    : Observable<DjangoPagedRestResponse<T, P>>;
  public list<P extends StructDataSet = {}>(state?: State, options?: OptionsExtras, accepts?: AcceptsMimeType.json)
    : Observable<DjangoRestResponse<T, P>>;
  public list<P extends StructDataSet = {}>(state: State, options: OptionsPaging, accepts: AcceptsMimeType.tableset)
    : Observable<TableSetWithRoot<T, P>>;
  public list<P extends StructDataSet = {}>(state?: State, options?: AnyOptions, accepts?: AcceptsMimeType)
    : Observable<ReturnsType<T, P>> {
    return this._list<P>(state, <any>options, accepts || AcceptsMimeType.json).pipe(shareReplay(1));
  }

  public listArrow<P extends StructDataSet = {}>(state?: State, options?: AnyOptions)
    : Observable<TableSetWithRoot<T, P>> {
    return <Observable<TableSetWithRoot<T, P>>>this._list<P>(state, <any>options, AcceptsMimeType.tableset).pipe(shareReplay(1));
  }


  public simpleList<P extends StructDataSet = {}>(
    filters: Filters, options: OptionsPaging, state?: State
  ): Observable<DjangoPagedRestResponse<T, P>>;
  public simpleList<P extends StructDataSet = {}>(
    filters: Filters, options: OptionsExtras,
    state: { skip: number } | { take: number }
  ): Observable<DjangoPagedRestResponse<T, P>>;
  public simpleList<P extends StructDataSet = {}>(
    filters: Filters, options?: OptionsExtras, state?: State
  ): Observable<DjangoRestResponse<T, P>>;
  public simpleList<P extends StructDataSet = {}>(
    filters: Filters, options?: AnyOptions, state?: State
  ): Observable<ReturnsType<T, P>> {
    return this.list<P>(getState(filters, state), <any>options, AcceptsMimeType.json);
  }


  public simpleListArrow<P extends StructDataSet = {}>(
    filters?: Filters, options?: AnyOptions, state?: State
  ): Observable<TableSetWithRoot<T, P>> {
    return this.list<P>(getState(filters, state), <any>options, AcceptsMimeType.tableset);
  }

  private _list<P extends StructDataSet = {}>(state: State, options: any, accepts: AcceptsMimeType)
    : Observable<ReturnsType<T, P>> {

    if (accepts === 'application/json') {
      return this.http.get<any>(
        `${this.getEndpoint()}/${this.viewset}/${getDjangoUrlParams(state, options)}`, {
        responseType: 'json'
      });
    } else {
      return this.http.get(
        `${this.getEndpoint()}/${this.viewset}/${getDjangoUrlParams(state, options)}`,
        {
          responseType: 'arraybuffer',
          headers: {
            'Accept': AcceptsMimeType.tableset
          }
        }).pipe(
          map(it => deserializeTableSet<WithRoot<T, P>>(it))
        );
    }
  }

  public get(id: number) {
    return this._get(id).pipe(shareReplay(1));
  }

  private _get(id: number) {
    return this.http.get<StructValue<T>>(
      `${this.getEndpoint()}/${this.viewset}/${id}/`, {
      responseType: 'json'
    });
  }

  public delete(id: number) {
    return this._delete(id);
  }

  private _delete(id: number) {
    return this.http.delete<void>(
      `${this.getEndpoint()}/${this.viewset}/${id}/`, {
      responseType: 'json'
    });
  }

  public post(it: StructValue<T>) {
    return this._post(it);
  }


  public importValidatePost(it: any) {
    return this._importValidatePost(it);
  }

  public importConfirmPost(it: number, obj: any) {
    return this._importConfirmPost(it, obj);
  }

  private _importConfirmPost(it: number, obj: any) {
    const formData = new FormData();
    formData.append('isbulk', obj.isbulk);
    return this.http.post<any>(
      `${this.getEndpoint()}/${this.viewset}/${it}/confirm/`,
      formData,
      {
        responseType: 'json'
      });
  }


  private _post(it: StructValue<T>) {
    return this.http.post<StructValue<T>>(
      `${this.getEndpoint()}/${this.viewset}/`,
      it,
      {
        responseType: 'json'
      });
  }

  private _importValidatePost(it: any) {
    const formData = new FormData();
    formData.append('module_cvnpath', it.module_cvnpath);
    formData.append('file', it.file);
    formData.append('isbulk', it.isbulk);
    return this.http.post<T>(
      `${this.getEndpoint()}/${this.viewset}/`,
      formData,
      {
        responseType: 'json'
      });
  }


  public put(id: number, it: StructValue<T>) {
    return this._put(id, it);
  }

  private _put(id: number, it: StructValue<T>) {
    return this.http.put<StructValue<T>>(
      `${this.getEndpoint()}/${this.viewset}/${id}/`,
      it,
      {
        responseType: 'json'
      });
  }

  public postFiles(id: number, obj: any) {
    const formData = createFormData(obj);
    return this.http.post<T>(
      `${this.getEndpoint()}/${this.viewset}/${id}/files/`,
      formData,
      {
        responseType: 'json'
      });
  }


  public patch<P>(id: number, it: P) {
    return this._patch(id, it);
  }

  private _patch<P>(id: number, obj: P) {
    return this.http.patch<T>(
      `${this.getEndpoint()}/${this.viewset}/${id}/`,
      obj,
      { responseType: 'json' });
  }

}
