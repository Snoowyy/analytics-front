import { StructData, Int, DataType, StructValue } from 'src/vendoring/arrow-js/type';
import { Table, Vector } from 'src/vendoring/arrow-js/Arrow';
import { Entry, SortedIndex, UniqueSortedIndex } from '../sortedindex';

export interface StructDataSet { [name: string]: StructData; }
export type TableSet<T extends StructDataSet> = { [K in keyof T]: Table<T[K]>; };
export type TableSetData<T extends StructDataSet> = {
    [K in keyof T]: {
        table: Table<T[K]>;
        totalLength?: number
    }
};
export type SortedIndexes<T extends StructData> = { [K in keyof T]: SortedIndex<T>; };
export type SortedIndexesSet<T extends StructDataSet> = { [K in keyof T]: SortedIndexes<T[K]>; };
export type UniqueSortedIndexes<T extends StructData> = { [K in keyof T]: UniqueSortedIndex<T>; };
export type UniqueSortedIndexesSet<T extends StructDataSet> = { [K in keyof T]: UniqueSortedIndexes<T[K]>; };
export type DictType<T, TValue> = { [K in keyof T]: TValue; };

export interface ApiResponseData<T extends StructDataSet> {
    ts: TableSetData<T>;
    ix: SortedIndexesSet<T>;
    uix: UniqueSortedIndexesSet<T>;
}

export interface TableSetJsonData<T extends StructData> {
    data: StructValue<T>[];
    schema: {
        fields: { name: string, type: string }[],
        pandas_version: string;
        primaryKey: string[];
    };
}

export type TableSetJson<T extends StructDataSet> = { [K in keyof T]: TableSetJsonData<T[K]>; };



export interface SizedIterable<T> extends Iterable<T> {
    length: number;
}

export interface HasId {
    id: number;
}

export interface StructDataHasId extends StructData {
    id: Int<number>;
}

export interface JoinResultItem<TOther, TIndexed extends StructData> {
    other: TOther;
    otherPosition: number;
    indexed: SizedIterable<Entry<TIndexed>>;
}

export interface JoinResult<TOther, TIndexed extends StructData>
    extends Iterable<JoinResultItem<TOther, TIndexed>> {
}
