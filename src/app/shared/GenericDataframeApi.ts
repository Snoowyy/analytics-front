import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';


export function pairs<TValue>(
    it: { [key: string]: TValue }) {
    return Object.keys(it).map(key => <[string, TValue]>[key, it[key]]);
}

export type DictType<T, TValue> = {[K in keyof T]: TValue; };

export function toDict<T, TValue>(key: (item: T) => string, value: (item: T) => TValue) {
    return (source: Observable<T>) => new Observable<DictType<T, TValue>>(observer => {
        const result: DictType<T, TValue> = <any>{};
        return source.subscribe({
            next(x) {
                result[key(x)] = value(x);
            },
            error(err) { observer.error(err); },
            complete() { observer.next(result); observer.complete(); }
        });
    });
}

export function toDataframes<T>(source: Observable<RawApiResponse<T>>) {
    return source.pipe(
        flatMap(it => pairs(it)),
        toDict(it => it[0], it => Array.from(getRows(it[1][0], it[1][1])))
    );
}

export interface ApiMetadata {
    metadata: {
        indexnames: string[]
    };
}

export type ApiArray = (number | string)[];

export interface ApiDataframe {
    columns: string[];
    index: ApiArray | ApiArray[];
    data: ApiArray[];
}

export interface ApiResponseItem {
    0: ApiMetadata;
    1: ApiDataframe;
}

export type RawApiResponse<T> = {[K in keyof T]: ApiResponseItem };

export function* getRows(meta: ApiMetadata, df: ApiDataframe) {
    let colIndex = 1;
    const indexnames = meta.metadata.indexnames.map(it => it === '' ? `_col${colIndex++}` : it);
    const names = indexnames.concat(df.columns);
    const objTemplate: any = {};

    // Creamos el objeto plantilla que va a ser copiado en cada iteracción
    for (const name of names) {
        objTemplate[name] = null;
    }

    // Copiamos los valores que provienen del índice (único o multiple)
    let index: number;
    for (let row = 0; row < df.data.length; row++) {
        const newObj = { ...objTemplate };

        if (meta.metadata.indexnames.length === 1) {
            newObj[meta.metadata.indexnames[0]] = df.index[row];
        } else {
            index = 0;
            for (const iname of indexnames) {
                newObj[iname] = (<ApiArray>df.index[row])[index++];
            }
        }

        // Copiamos los valores que provienen de los datos no de los índices
        index = 0;
        for (const cname of df.columns) {
            newObj[cname] = df.data[row][index++];
        }

        yield newObj;
    }
}

