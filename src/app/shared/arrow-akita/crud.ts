import { Table } from 'src/vendoring/arrow-js/Arrow';
import { StructData } from 'src/vendoring/arrow-js/type';
import { EntityState, ActiveState } from '@datorama/akita';
import { ArrowState } from './arrow.state';
import { getIndexes } from '../TableSetUtils';

export function set<S extends ArrowState<E>, E extends StructData>(state: S, table: Table<E>, idKey: string, storeName: string) {
    const newState = <S>{
        ...(state as any),
        table: table,
        ix: getIndexes(table, false, storeName),
        uix: getIndexes(table, true, storeName),
        loading: false
    };

    if (resetActive(newState, idKey)) {
        newState.active = null;
    }

    return newState;
}

function resetActive<E extends StructData>(state: ArrowState<E>, idKey: string) {
    return state.active !== null && !entityExists(state.active, state, idKey);
}

/**
 * Check if entity exists
 */
export function entityExists<E extends StructData>(id: number, state: ArrowState<E>, idKey: string) {
    return state.uix[idKey].getPositionByValue(id) > 0;
}
