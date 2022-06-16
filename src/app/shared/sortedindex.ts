import { StructData, TypedArray, Int, StructValue } from 'src/vendoring/arrow-js/type';
import { Vector, Table } from 'src/vendoring/arrow-js/Arrow';
import linq, { Range } from 'linq-es2015';
import { RangeSizedIterable, sortedUnique, sort, getTAfromSizedIterable, binarySearch, binarySearchLeftMost, binarySearchRightMost } from './util';
import { SizedIterable } from './models/types';

export class SortedIndex<T extends StructData> {
    protected _sortedPositions: TypedArray = null;
    protected _key: TypedArray = null;
    protected _li: TypedArray = null;
    protected _ui: TypedArray = null;

    public constructor(
        public readonly table: Table<T>,
        public readonly columnName: string,
        positions: Iterable<number>,
        public readonly isUnique: boolean = false
    ) {
        const positions2 = positions ? positions : RangeSizedIterable(table.length);
        const column = <Vector<Int<number>>>table.getColumn(columnName);
        if (!column) {
            throw Error(`No se encontró la columna ${columnName}`);
        }

        const sortedPositions = sort(column, positions2);
        const maxIndexPosition = sortedPositions.length;
        const maxKey = 2 ** column.type.bitWidth - 1;

        if (isUnique) {
            this._key = getTAfromSizedIterable(maxKey, maxIndexPosition, sortedUnique(sortedPositions, column));
        } else {
            const entries = linq(this.getEntries(sortedPositions, column)).ToArray();
            const length = entries.length;
            this._key = getTAfromSizedIterable(maxKey, length, linq(entries).Select(it => it.value));
            this._li = getTAfromSizedIterable(maxIndexPosition, length, linq(entries).Select(it => it.li));
            this._ui = getTAfromSizedIterable(maxIndexPosition, length, linq(entries).Select(it => it.ui));
        }

        this._sortedPositions = sortedPositions;
    }

    private *getEntries(colPos: TypedArray, sortedColumn: Vector<Int<number>>) {
        let li = -1, ui = -1;
        let oldValue = null;
        let value = null;
        const length = colPos.length;
        let index = 0;
        for (const pos of colPos) {
            value = sortedColumn.get(pos);
            if (index === 0) {
                li = index;
                oldValue = value;
            } else {
                if (oldValue < value) {
                    ui = index - 1;
                    yield { value: oldValue, li, ui: ui };
                    li = ui + 1;
                    oldValue = value;
                } else if (oldValue > value) {
                    throw Error('El array no se encuentra ordenado!');
                }
            }
            index++;
        }

        if (oldValue === value) {
            yield { value, li, ui: length - 1 };
        }
    }

    public getIndexPositionsByValue(value: number): SizedIterable<number> {
        const { _key } = this;
        const index = binarySearch(value, _key);
        let size = 0, li = 0, ui = 0;
        if (index === -1) {
            size = 0;
        } else if (this.isUnique) {
            li = ui = index;
            size = 1;
        } else {
            li = this._li[index];
            ui = this._ui[index];
            size = ui - li + 1;
        }


        function* _getIndexPositionsByValue() {
            if (index === -1) {
                return;
            }

            for (let i = li; i <= ui; i++) {
                yield i;
            }
        }

        return {
            [Symbol.iterator]: _getIndexPositionsByValue,
            length: size
        };
    }

    public getPositionsByValue(value: number): SizedIterable<number> {
        const indexes = this.getIndexPositionsByValue(value);
        const { _sortedPositions } = this;
        return Object.assign(linq(indexes)
            .Select(it => _sortedPositions[it]), {
                length: indexes.length
            });
    }

    public getByValue(value: number): SizedIterable<StructValue<T>> {
        const positions = this.getPositionsByValue(value);
        return this.getByPositions(positions, positions.length);
    }

    public getPositionsByRange(start?: number, end?: number)
        : Iterable<number> {
        let starti: number, endi: number;
        const { _key, _sortedPositions, _li, _ui, isUnique } = this;
        const maxi = _key.length - 1;
        if (start) {
            starti = binarySearchLeftMost(start, _key);
            if (starti > maxi) {
                starti = -1;
            }
        } else {
            starti = 0;
        }
        if (end) {
            endi = binarySearchRightMost(end, _key);
        } else {
            endi = maxi;
        }

        if (starti === -1 || endi === -1) {
            return [];
        }

        const startipos = _li[starti];
        const endipos = isUnique ? _li[endi] : _ui[endi];

        return Range(startipos, endipos - startipos + 1).Select(it => _sortedPositions[it]);
    }

    public getEntriesByValue(value: number): SizedIterable<Entry<T>> {
        const indexes = this.getIndexPositionsByValue(value);
        return this.getEntriesByIndexes(indexes, indexes.length);
    }

    public getEntriesByIndexes(indexes: Iterable<number>, length: number) {
        const { table, _sortedPositions } = this;
        function* _getEntriesByIndexes() {
            for (const i of indexes) {
                const pos = _sortedPositions[i];
                yield <Entry<T>>{
                    // indexPosition: i,
                    position: pos,
                    value: table.get(pos)
                };
            }
        }

        return {
            [Symbol.iterator]: _getEntriesByIndexes,
            length: length
        };
    }

    public getByPositions(positions: Iterable<number>, length: number = null) {
        const { table } = this;
        function* _getByPositions() {
            for (const pos of positions) {
                yield table.get(pos);
            }
        }

        return {
            [Symbol.iterator]: _getByPositions,
            length: length === null ? undefined : length
        };
    }

    public getPositionsByValues(values: Iterable<number>) {
        return linq(values).SelectMany(it => this.getPositionsByValue(it));
    }

    public getByValues(values: Iterable<number>): Iterable<StructValue<T>> {
        const positions = this.getPositionsByValues(values);
        return this.getByPositions(positions);
    }

    public filterByPositions(positions: Iterable<number>): SortedIndex<T> {
        if (positions === null) {
            return this;
        }

        return new SortedIndex(this.table, this.columnName, positions);
    }

    public get length() {
        return this._sortedPositions.length;
    }

    public getUniqueKeys() {
        return this._key;
    }

    public getAllRows() {
        return this.getByPositions(this._sortedPositions);
    }


    public getAllEntryRows() {
        const r = linq(this._sortedPositions).Select((it, i) => <Entry<T>>{
            position: it,
            indexPosition: i,
            value: this.table.get(it)
        });
        return Object.assign(r, {
            lengthIndexPositions: this._sortedPositions.length,
            lengthPositions: this.table.length,
        });
    }
}

export interface Entry<T extends StructData> {
    // indexPosition: number;
    position: number;
    value: StructValue<T>;
}

export class UniqueSortedIndex<T extends StructData> extends SortedIndex<T> {
    public constructor(
        table: Table<T>,
        columnName: string,
        positions: Iterable<number>
    ) {
        super(table, columnName, positions, true);
    }

    public filterByPositions(positions: Iterable<number>): UniqueSortedIndex<T> {
        if (positions === null) {
            return this;
        }

        const index = new UniqueSortedIndex(this.table, this.columnName, positions);
        return index;
    }

    getPositionByValue(value: number): number {
        const indexPosition = binarySearch(value, this._key);
        if (indexPosition === -1) {
            throw Error(`No se encontró el valor ${value} en el índice`);
        }
        return this._sortedPositions[indexPosition];
    }

    getRowByValue(value: number) {
        return this.table.get(this.getPositionByValue(value));
    }
}

