import { HasId, JoinResult, StructDataHasId } from './models/types';
import { StructData, StructValue } from 'src/vendoring/arrow-js/type';
import { SortedIndex } from './sortedindex';
import linq from 'linq-es2015';
import { defaultSelector } from './util';

export function leftJoinResultIndex<
    TOtherResult extends HasId,
    TIndexedResult extends StructDataHasId,
    TIndexed extends StructData>(
        joinResult: JoinResult<TOtherResult, TIndexedResult>,
        index: SortedIndex<TIndexed>,
        joinResultSelector: (it: StructValue<TIndexedResult>) => number = (it) => it.id
    ) {
    return linq(joinResult).Select(it => ({
        other: it.other,
        indexed: linq(it.indexed)
            .Select(it2 => ({
                other: it2,
                indexed: index.getEntriesByValue(joinResultSelector(it2.value))
            }))
    }));
}

export function leftJoinIterableIndex<
    TIndexed extends StructData,
    TOther extends HasId
    >(
        iter: Iterable<TOther>,
        index: SortedIndex<TIndexed>,
        tableSelector: (it: TOther) => number = defaultSelector
    ): JoinResult<TOther, TIndexed> {
    return leftJoinIterableIndex2(iter, index, tableSelector);
}

export function leftJoinIterableIndex2<
    TIndexed extends StructData,
    TOther
    >(
        iter: Iterable<TOther>,
        index: SortedIndex<TIndexed>,
        tableSelector: (it: TOther) => number
    ): JoinResult<TOther, TIndexed> {
    function* _leftJoinIterableIndex() {
        let i = 0;
        for (const it of iter) {
            yield { other: it, otherPosition: i++, indexed: index.getEntriesByValue(tableSelector(it)) };
        }
    }

    return {
        [Symbol.iterator]: _leftJoinIterableIndex
    };
}
