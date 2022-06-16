import { StructData, StructValue } from 'src/vendoring/arrow-js/type';
import * as akita from '@datorama/akita';
import { Table } from 'src/vendoring/arrow-js/Arrow';
import linq from 'linq-es2015';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { GenericTableService } from './dataservices/generic-table.service';
import { State, process } from '@progress/kendo-data-query';
import { Router } from '@angular/router';
import { DataRoutes } from './utils/DataRoute';

// TODO: ¿Probablemente PartialJson debería llamarse PartialRow?
export type PartialJson<T extends StructData> = Partial<StructValue<T>>;

export interface TableError<T = any> {
    inner: T;
    tableName: string;
    message: string;
}

export interface TableState<
    TEntity extends StructData
    > extends akita.EntityState<StructValue<TEntity>, TableError> {
}

export class TableStore<
    TState extends TableState<TEntity>,
    TEntity extends StructData
    > extends akita.EntityStore<TState, StructValue<TEntity>> {

    /**
     *  Inicializa el almacen usando el GenericTableService sólo si el almacen se encuetra en estado pristino
     */
    fromPristine(
        source: GenericTableService<TEntity>
    ) {
        if (this.isPristine) {
            source.list().pipe(first()).subscribe(it => this.set(it));
        }
    }
}

export interface IQuery<E extends StructData> {
    selectState<R>(
        state: State,
        project: (x: StructValue<E>) => R
    ): Observable<DataResult<R>>;
}

export class QueryTable<S extends TableState<E>, E extends StructData>
    extends akita.QueryEntity<S, StructValue<E>>
    implements IQuery<E> {

    selectState<R>(
        state: State,
        project: (x: StructValue<E>) => R
    ): Observable<DataResult<R>> {
        return this.select(s => {
            const array = linq(s.ids).Select(id => project(s.entities[id])).ToArray();
            // TODO: Implementar una versión de process que funcione con iterables y usarla
            // aquí para evitar que deje de ser peresoza la carga.
            return <DataResult<R>>process(array, state);
        });
    }

}

export interface DataResult<T> {
    /**
     * The data that will be rendered by the Grid as an array.
     */
    data: T[];
    /**
     * The total number of records that are available.
     */
    total: number;
}

export type ArrowDataResult<E extends StructData> = DataResult<StructValue<E>>;


export function* getJsonRows<E extends StructData>(table: Table<E>): Iterable<StructValue<E>> {
    const fields = table.schema.fields;
    const o = <any>{};
    for (const r of table) {
        // tslint:disable-next-line:forin
        let fi = 0;
        for (const f of fields) {
            o[f.name] = r.get(fi);
            fi++;
        }
        yield { ...o };
    }
}

export function toJsonArray<E extends StructData>(table: Table<E>) {
    return linq(getJsonRows(table)).ToArray();
}

export function filterRoutesWithPrefix(router: Router, prefix: string) {
    return linq(<DataRoutes>router.config).Where(it => it.path.startsWith(prefix));
}

/**
 * Se usa para filtrar las tuplas de un combineLatest de Rxjs, de modo que no deja pasar las tuplas
 * donde uno de los elementos de la misma aún no ha tiene información.
 */
export function onlyTuplesWithData<T extends any[]>(tuple: T) {
    return tuple.every(it => it != null && (tableNotEmpty(it) && tableNotEmpty(it.table) || !it.loading));

    function tableNotEmpty(table: Table) {
        return (table && table instanceof Table) ? table.count() !== 0 : true;
    }
}
