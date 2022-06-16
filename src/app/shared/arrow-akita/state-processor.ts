import { State, CompositeFilterDescriptor, FilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';
import { KendoStringOperator } from 'src/app/modules/core/dataservices/generic-table.service';
import { DataResult } from 'src/app/modules/core/shared';
import { StructData, StructValue } from 'src/vendoring/arrow-js/type';
import linq from 'linq-es2015';
import { identity } from 'rxjs';
import * as moment from 'moment';

export class StateProcessor {
    private _filter: Function;
    private _sort: Function;
    count: number;

    constructor(private state: State) {
        this._filter = this.getFilterFunction(state);
        this._sort = this.getSortFunction(state);
    }

    public process<E, R>(source: Iterable<E>, calculateCount: boolean, project?: (x: E) => R) {
        let iterable = linq(source).Select(project);
        const { _filter, _sort, state } = this;

        if (_filter) {
            iterable = iterable.Where(<any>_filter);
        }

        if (_sort) {
            iterable = _sort(iterable);
        }

        if (calculateCount) {
            this.count = iterable.Count();
        }

        if (state.skip) {
            iterable = iterable.Skip(state.skip);
        }

        if (typeof (state.take) === 'number') {
            iterable = iterable.Take(state.take);
        }

        return iterable;
    }

    public getDataResult<E>(source: Iterable<E>): DataResult<E>;
    public getDataResult<E, R>(
        source: Iterable<E>,
        project: (x: E) => R
    ): DataResult<R>;
    public getDataResult<E, R>(
        source: Iterable<E>,
        project?: (x: E) => R
    ) {
        if (!project) {
            project = <any>identity;
        }

        const iterable = this.process(source, true, project);
        return <DataResult<R>>{
            data: iterable.ToArray(),
            total: this.count
        };
    }

    private getSortFunction(state: State) {
        if (!state.sort) {
            return null;
        }

        let fBody = 'return it';

        for (const sortItem of state.sort) {
            if (sortItem.dir === 'asc') {
                fBody += `.OrderBy(it2 => it2["${sortItem.field}"])`;
            } else {
                fBody += `.OrderByDescending(it2 => it2["${sortItem.field}"])`;
            }
        }

        return new Function('it', fBody);
    }


    private getFilterFunction(state: State) {
        if (!state.filter) {
            return null;
        }

        const expression = this.getFilterExpression(state.filter);
        if (expression) {
            return new Function('it', 'i', `return ${expression}`);
        } else {
            return null;
        }
    }

    private getFilterExpression(filter: CompositeFilterDescriptor): string {
        if (filter.filters.length === 0) {
            return null;
        } else if (filter.logic === 'or') {
            return '(' + filter.filters.map(it => this.getFilter(it)).join(') || (') + ')';
        } else {
            return '(' + filter.filters.map(it => this.getFilter(it)).join(') && (') + ')';
        }
    }

    private getFilter(it: CompositeFilterDescriptor | FilterDescriptor): string {
        if (isCompositeFilterDescriptor(it)) {
            return this.getFilterExpression(it);
        } else {
            return this.getOperation(it);
        }
    }

    private getOperation(f: FilterDescriptor): string {
        if (typeof (f.operator) === 'function') {
            throw Error('No se soportan funciones de ordenamiento en la API selectState');
        }

        if (f.ignoreCase) {
            return this.getUncasedOperation(f);
        }

        return this.getCasedOperation(f);
    }

    private getUncasedOperation(f: FilterDescriptor) {
        const itCased = `it.${f.field}.toLocaleLowerCase()`;
        const valueCased = f.value.toString().toLocaleLowerCase();
        switch (f.operator as KendoStringOperator) {
            case 'contains':
                return `${itCased}.includes("${valueCased}")`;
            case 'doesnotcontain':
                return `! ${itCased}.includes("${valueCased}")`;
            case 'endswith':
                return `${itCased}.endsWith("${valueCased}")`;
            case 'startswith':
                return `${itCased}.startsWith("${valueCased}")`;
            default: throw Error('La api de Django no soporta filtros con el operador ' + f.operator);
        }
    }

    private getCasedOperation(f: FilterDescriptor) {
        const whatfield = this.whatField(f);
        const field = whatfield.field;
        const value = whatfield.value;
        switch (f.operator) {
            case 'contains': return `${field}.includes("${value}")`;
            case 'endswith': return `${field}.endsWith("${value}")`;
            case 'gt': return `${field} > ${value}`;
            case 'gte': return `${field} >= ${value}`;
            case 'lt': return `${field} < ${value}`;
            case 'lte': return `${field} <= ${value}`;
            case 'startswith': return `${field}.startsWith("${value}")`;
            case 'doesnotcontain': return `! ${field}.includes("${value}")`;
            case 'eq': return `${field} === ${value}`;
            case 'neq': return `${field} !== ${value}`;
            default: throw Error('La api de Django no soporta filtros con el operador ' + f.operator);
        }
    }

    private whatField(f: FilterDescriptor) {
        switch (typeof f.value) {
            case 'string': return { field: `it.${f.field}.toLocaleLowerCase()`, value: f.value.toLocaleLowerCase() };
            case 'object': return { field: `moment(it.${f.field}, 'DD/MM/YYYY').unix()`, value: `${moment(f.value, 'DD/MM/YYYY').unix()}` };
            default: return { field: `it.${f.field}`, value: f.value};
        }
    }
}
