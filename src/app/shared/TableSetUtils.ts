import { org } from '../../TableSet';
import { Table, Vector, RecordBatch } from '../../vendoring/arrow-js/Arrow';
import { Schema, Field, StructData, StructValue, DataType, Utf8 } from '../../vendoring/arrow-js/type';
import { FloatVector, IntVector, Utf8Vector } from '../../vendoring/arrow-js/vector';
import { UniqueSortedIndexes, SortedIndexes, DictType, StructDataSet, SortedIndexesSet, ApiResponseData, TableSetData } from './models/types';
import { SortedIndex, UniqueSortedIndex } from './sortedindex';
import linq from 'linq-es2015';
import { FlatListData } from 'src/vendoring/arrow-js/data';
import * as fp from 'lodash/fp';

export function getIndexes<T extends StructData>(
    table: Table<T>,
     isUnique: true,
     tableName: string
): UniqueSortedIndexes<T>;
export function getIndexes<T extends StructData>(
    table: Table<T>,
    isUnique: false,
    tableName: string
): SortedIndexes<T>;
export function getIndexes<T extends StructData>(
    table: Table<T>,
    isUnique: boolean,
    tableName: string
): SortedIndexes<T> | UniqueSortedIndexes<T>;
export function getIndexes<T extends StructData>(
    table: Table<T>,
    isUnique: boolean,
    tableName: string
): SortedIndexes<T> | UniqueSortedIndexes<T> {
    type ResultType = DictType<T, SortedIndex<T>>;
    const result: ResultType = <any>{};
    const proxy = new Proxy(result, <ProxyHandler<ResultType>>{
        get: (target: ResultType, prop: string) => {
            let index: SortedIndex<T>;
            if (prop === 'toJSON' || <any>prop === Symbol.toStringTag) {
                if (isUnique) {
                    return `[UniqueSortedIndexes on ${tableName}]`;
                } else {
                    return `[SortedIndexes on ${tableName}]`;
                }
            }
            if (target[prop]) {
                index = target[prop];
            } else if (isUnique) {
                index = new UniqueSortedIndex(table, prop, null);
                target[prop] = index;
            } else {
                index = new SortedIndex(table, prop, null);
                target[prop] = index;
            }
            return index;
        }
    });

    return proxy;
}

export function toIndexesSet<
    T extends StructDataSet,
    TIndexSet extends SortedIndexesSet<T>
>(
    tableSet: TableSetData<T>,
    isUnique: boolean
): TIndexSet {
    const result = <any>{};
    // tslint:disable-next-line:forin
    for (const key of Object.keys(tableSet)) {
        result[key] = getIndexes(tableSet[key].table, isUnique, key);
    }
    return result;
}

export function toApiResponseData<T extends StructDataSet>(source: ArrayBuffer)
    : ApiResponseData<T> {
    const tableSet = deserializeTableSet<T>(source);
    return {
        ix: toIndexesSet(tableSet, false),
        uix: toIndexesSet(tableSet, true),
        ts: tableSet
    };
}

export function deserializeTableSet<T extends StructDataSet>(buffer: ArrayBuffer)
    : TableSetData<T> {
    const sizeMeta = new DataView(buffer).getUint32(buffer.byteLength - 4, true);
    const buf = new flatbuffers.ByteBuffer(new Uint8Array(buffer.slice(buffer.byteLength - 4 - sizeMeta, buffer.byteLength - 4)));
    const set = org.logyca.arrow.flatbuf.Set.getRootAsSet(buf);

    const meta: [string, number, number, number][] = [];
    for (let i = 0; i < set.tablesLength(); i++) {
        const t = set.tables(i);
        meta[i] = [t.name(), t.size(), t.offset(), t.totalLength()];
    }

    const result: DictType<T, { table: Table<any>, totalLength: number }> = <any>{};
    for (const t of meta) {
        const [name, size, offset, totalLength] = t;
        result[name] = {
            table: Table.from([new Uint8Array(buffer, offset, size)]),
            totalLength: totalLength
        };
    }

    return result;
}

export function getByPositions<T extends StructData>(table: Table<T>, positions: Iterable<number>) {
    function* _getByPositions() {
        for (const pos of positions) {
            yield table.get(pos);
        }
    }

    return {
        [Symbol.iterator]: _getByPositions
    };
}



/**  Adapted from https://github.com/apache/arrow/pull/2322/files **/

function RecordBatch_from<T extends StructData>(vectors: Vector[], names?: string[]) {
    return new RecordBatch<T>(Schema_from(vectors, names),
        Math.max(...vectors.map((v) => v.length)),
        vectors
    );
}

function Table_fromVectors<T extends StructData>(vectors: Vector[], names?: string[]) {
    return new Table([RecordBatch_from<T>(vectors, names)]);
}

export type VectorCtor<TC extends DataType> = (source: Iterable<TC['TValue']>) => Vector<TC>;
export type VectorCtors<T extends StructData> = { [k in keyof T]: VectorCtor<T[k]> };

export function Table_fromJsonValue<T extends StructData>(
    json: Iterable<StructValue<T>>,
    transformers: VectorCtors<T>
): Table<T> {
    const entries = fp.entries(transformers);
    const vectors = entries.map(it => it[1](linq(json).Select(it2 => it2[it[0]])));
    return Table_fromVectors(vectors, entries.map(it => it[0]));
}

export function getFloat32Vector(source: Iterable<number>) {
    return FloatVector.from(Float32Array.from(source));
}

export function getInt32Vector(source: Iterable<number>) {
    return IntVector.from(Int32Array.from(source));
}

export function getUInt32Vector(source: Iterable<number>) {
    return IntVector.from(Uint32Array.from(source));
}

export function getInt16Vector(source: Iterable<number>) {
    return IntVector.from(Int16Array.from(source));
}

export function getUInt16Vector(source: Iterable<number>) {
    return IntVector.from(Uint16Array.from(source));
}

export function getInt8Vector(source: Iterable<number>) {
    return IntVector.from(Int8Array.from(source));
}

export function getUInt8Vector(source: Iterable<number>) {
    return IntVector.from(Uint8Array.from(source));
}

export function getUtf8Vector(source: Iterable<string>) {
    return Utf8Vector_from(source);
}

const utf8Encoder = new TextEncoder();

function Utf8Vector_from(source: Iterable<string>) {
    let offset = 0;
    const values = linq(source).ToArray();
    const offsets = Uint32Array.of(0, ...linq(values).Select((d) => { offset += d.length; return offset; }));
    const data = utf8Encoder.encode(values.join(''));
    return new Utf8Vector(new FlatListData(new Utf8(), values.length, null, offsets, data));
}

function Schema_from(vectors: Vector[], names?: string[]) {
    return new Schema(vectors.map((v, i) => new Field(names ? names[i] : ('' + i), v.type)));
}


/** End Adapted **/

