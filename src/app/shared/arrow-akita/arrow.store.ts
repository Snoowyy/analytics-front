import { ArrowState } from './arrow.state';
import { StructData} from 'src/vendoring/arrow-js/type';
import { Table } from 'src/vendoring/arrow-js/Arrow';
import { __globalState, Store, isDev, transaction } from '@datorama/akita';
import * as crud from './crud';
import { GenericTableService, AcceptsMimeType, OptionsExtras, OptionsPaging } from 'src/app/modules/core/dataservices/generic-table.service';
import { getIndexes } from '../TableSetUtils';

export class ArrowStore<S extends ArrowState<E>, E extends StructData> extends Store<S> {
    /**
     *
     * Initiate the store with the state
     */
    constructor(initialState = {}, options: { idKey?: string; storeName?: string } = {}) {
        super({ ...getInitialArrowState(options.storeName), ...initialState }, options);
    }

    set(entities: Table<E>) {
        if (isDev()) {
            __globalState.setAction({ type: 'Set Arrow Entities' });
        }

        this.setState(state => crud.set(state, entities, this.idKey, this.storeName));
        this.setDirty();
    }

    /**
     *  Inicializa el almacen usando el GenericTableService sólo si el almacen se encuetra en estado pristino
     */
    fromPristine(
        source: GenericTableService<E>,
        options?: OptionsExtras
    ) {
        if (this.isPristine) {
            source.list({}, <any>options, AcceptsMimeType.tableset).subscribe(
                it => this.set(it.$root.table)
            );
        }
    }

    get table() {
        return this._value().table;
    }


    setActive(activeId: number) {
        if (isDev()) {
            __globalState.setAction({ type: 'Set Active Arrow Entity', entityId: activeId });
        }
        this.setState(state => {
            return {
                ...(state as any),
                active: activeId
            };
        });
    }
}

export function getInitialArrowState(storeName: string) {
    const table = Table.empty();
    return <ArrowState>{
        error: null,
        loading: true,
        table: table,
        ix: getIndexes(table, false, storeName),
        uix: getIndexes(table, true, storeName),
        active: null
    };
}
