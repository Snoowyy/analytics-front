import { ArrowState } from './arrow.state';
import { ArrowStore } from './arrow.store';
import { StructData, StructValue } from 'src/vendoring/arrow-js/type';
import { Observable, of } from 'rxjs';
import { Query, isFunction } from '@datorama/akita';
import { State } from '@progress/kendo-data-query';
import linq from 'linq-es2015';
import { DataResult } from 'src/app/modules/core/shared';
import { switchMap } from 'rxjs/operators';
import { Table } from 'src/vendoring/arrow-js/table';
import { StateProcessor } from './state-processor';
/**
 *  An abstraction for querying the entities from the store
 */
export class QueryArrow<S extends ArrowState<E>, E extends StructData>
    extends Query<S> {
    protected store: ArrowStore<S, E>;

    constructor(store: ArrowStore<S, E>) {
        super(store);
    }

    getEntity(id: number): StructValue<E> {
        return this.getSnapshot().uix[this.store.idKey].getRowByValue(id);
    }

    selectState<R>(
        state: State,
        project: (x: StructValue<E>) => R
    ) {
        const processor = new StateProcessor(state);
        return this.select(it => processor.getDataResult(it.table, project));
    }

    /**
   * Select the active entity's id.
   */
    selectActiveId(): Observable<number> {
        return this.select(state => state.active);
    }

    /**
   * Select the active entity.
   */
    selectActive<R>(): Observable<StructValue<E>>;
    selectActive<R>(project: (entity: StructValue<E>) => R): Observable<R>;
    selectActive<R>(project?: (entity: StructValue<E>) => R): Observable<R | StructValue<E>> {
        return this.selectActiveId().pipe(switchMap(activeId => this.selectEntity(activeId, project)));
    }

    /**
   * Select an entity or a slice of an entity.
   *
   * @example
   * this.pagesStore.selectEntity(1)
   * this.pagesStore.selectEntity(1, entity => entity.config.date)
   *
   */
    selectEntity<R>(id: number): Observable<StructValue<E>>;
    selectEntity<R>(id: number, project: (entity: StructValue<E>) => R): Observable<R>;
    selectEntity<R>(id: number, project?: (entity: StructValue<E>) => R): Observable<R | StructValue<E>> {
        if (id == null || isNaN(id)) {
            return of(null);
        }

        if (!project) {
            return this._byId(id);
        }

        return this.select(() => {
            if (this.hasEntity(id)) {
                return project(this.getEntity(id));
            }

            return undefined;
        });
    }

    private _byId(id: number): Observable<E> {
        return this.select(() => this.getEntity(id));
    }

    /**
   * Returns whether entity exists.
   */
    hasEntity(projectOrIds: number | number[] | ((entity: E) => boolean)): boolean {
        if (isFunction(projectOrIds)) {
            return linq(this.getAll()).Any(projectOrIds);
        }

        if (Array.isArray(projectOrIds)) {
            return projectOrIds.every(id => (id as any) in this.store.table);
        }

        return (projectOrIds as any) in this.store.table;
    }

    getAll(): Table<E> {
        return this.store.table;
    }
}
