import { StructValue, StructData, Int } from '../../../vendoring/arrow-js/type';
import { StructDataSet } from './types';
import { ArrowState } from '../arrow-akita';
import { Table } from 'src/vendoring/arrow-js/Arrow';
import { getIndexes } from '../TableSetUtils';

export type NestedArrowValues<T extends StructDataSet> = { [K in keyof T]: StructValue<T[K]> };

export interface Entity extends StructData {
    id: Int<number>;
}

// PlanEntity representa la estructua JSON anidada a partir del tipo Entity. ¿Deberíamos cambiarle el nombre?
export type PlainEntity<T, ToOne extends StructDataSet, ToMany> = T & NestedArrowValues<ToOne>;

export type ForeignKey = Int<number>;

export function createInitialStateBase<T extends StructData>(table: Table<T>, storeName: string): ArrowState<T> {
    return {
        table: table,
        ix: getIndexes(table, false, storeName),
        uix: getIndexes(table, true, storeName),
        active: null,
        error: null,
        loading: true
    };
}
