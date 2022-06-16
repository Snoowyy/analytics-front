import { StructData } from 'src/vendoring/arrow-js/type';
import { Table } from 'src/vendoring/arrow-js/table';
import { SortedIndexes, UniqueSortedIndexes } from '../models/types';
import { ID } from '@datorama/akita';

export interface ArrowState<E extends StructData = any, ErrorT = any> {
    table: Table<E>;
    ix: SortedIndexes<E>;
    uix: UniqueSortedIndexes<E>;
    loading: boolean;
    error: ErrorT;
    active: number;
}
