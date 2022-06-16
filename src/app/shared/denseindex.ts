import { TypedArray, StructData } from 'src/vendoring/arrow-js/type';
import { SizedIterable } from './models/types';
import { Table } from 'src/vendoring/arrow-js/Arrow';
import { getTAfromValueLength } from './util';

export class DenseIndex<TTarget extends StructData> {
    private index: TypedArray;

    constructor(
        private source: SizedIterable<{ position: number, indexPosition: number }>,
        private target: Table<TTarget>
    ) {
        const index = getTAfromValueLength(target.length, this.source.length);
        for (const item of source) {
            index[item.indexPosition] = item.position;
        }
    }

    get(i: number) {
        return this.target.get(this.index[i]);
    }
}
