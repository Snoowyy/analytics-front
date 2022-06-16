import * as TimSort from '../../vendoring/timsort/timsort';
import { HasId } from './models/types';
import { Observable, from, race, merge } from 'rxjs';
import { TypedArray, Int } from 'src/vendoring/arrow-js/type';
import { Vector } from 'src/vendoring/arrow-js/Arrow';
import { Range } from 'linq-es2015';
import { CvnCacheService } from '../modules/core/services/cvn-cache/cvn-cache.service';
import { FileInfo } from '@progress/kendo-angular-upload';
import { tap, map, filter } from 'rxjs/operators';



/**
 * Fichero de funciones de utilidad
 * **/
export function truncStr(str: string, maxlength: number) {
    if (str.length > maxlength) {
        return str.substring(0, Math.min(str.length, maxlength) - 1) + '…';
    }
    return str;
}

export function get<TKey, TValue>(dict: Map<TKey, TValue>, key: TKey) {
    const val = dict.get(key);
    if (!val) {
        throw new Error('No se ha encontrado la llave ' + key);
    }
    return val;
}

export function notNull<T>(source: T | null | undefined) {
    if (source) {
        return source;
    }
    throw Error('El valor no puede ser ni nulo ni indefinido');
}


export function RangeSizedIterable(length: number) {
    return {
        [Symbol.iterator]: () => Range(0, length)[Symbol.iterator](),
        length: length
    };
}


export function* iterateIterables<T>(...source: Iterable<T>[]): IterableIterator<T> {
    const iters: Iterator<T>[] = [];
    source.forEach(it => iters.push(it[Symbol.iterator]()));
    let i = -1;
    let ended = 0;
    const length = source.length;
    while (ended < length) {
        i = (i + 1) % length;
        const iter = iters[i];
        if (iter === null) {
            continue;
        }
        const it = iter.next();
        if (it.done) {
            iters[i] = null;
            ended++;
        } else {
            yield it.value;
        }
    }
}

export function chunk<T>(size: number, source: T[])
    : Iterable<Iterable<T>> {

    const length = source.length;
    function* chunked(li, ui) {
        for (let j = li; j <= ui; j++) {
            if (j < length) {
                yield source[j];
            } else {
                break;
            }
        }
    }

    function* _chunk() {
        for (let i = 0; i < length; i += size) {
            yield chunked(i, i + size - 1);
        }
    }

    return { [Symbol.iterator]: _chunk };
}

export function defaultSelector(it: HasId) {
    return it.id;
}

function ascComparator(a, b) {
    return a - b;
}

export function ascSort<T>(array: T[]) {
    TimSort.sort(array, ascComparator);
    return array;
}

export function binarySearchLeftMost(value: number, array: TypedArray) {
    let l = 0;
    let r = array.length;
    while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (array[m] < value) {
            l = m + 1;
        } else {
            r = m;
        }
    }
    return l;
}

export function binarySearchRightMost(value: number, array: TypedArray) {
    let l = 0;
    let r = array.length;
    while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (array[m] > value) {
            r = m;
        } else {
            l = m + 1;
        }
    }
    return l - 1;
}

export function binarySearch(value: number, array: TypedArray) {
    let l = 0;
    let r = array.length - 1;
    while (l <= r) {
        const m = Math.floor((l + r) / 2);
        if (array[m] < value) {
            l = m + 1;
        } else if (array[m] > value) {
            r = m - 1;
        } else {
            return m;
        }
    }
    return -1;
}

/**
 * Devuelve las posciones de source (es un iterable de numeros que representan
 * posiciones en column), y al mismo tiempo verifica que dichas posiciones tomadas
 * del vector column arrojen valores ordenados y únicos.
 * @param source Iterable con las posiciones que deben estar ordenados según column
 * @param column Vector en el que se buscan las posiciones que están en source.
 */
export function sortedUnique(source: Iterable<number>, column: Vector<Int<number>>) {
    function* _sortedUnique() {
        let oldIt: number = -Number.MAX_VALUE;
        for (const i of source) {
            const it = column.get(i);
            if (!(oldIt < it)) {
                throw new Error('El origen no tiene valores únicos ordenados');
            } else {
                oldIt = it;
                yield it;
            }
        }
    }

    return { [Symbol.iterator]: _sortedUnique };
}

export function sort(
    column: Vector<Int<number>>,
    positions: Iterable<number>
): TypedArray {
    const { length } = column;
    const array = getTAfromSizedIterable(length, length, positions);
    array.sort((a, b) => (column.get(a) - column.get(b)) || (a - b));
    return array;
}

export function getTAfromValueLength(maxValue: number, length: number = maxValue) {
    const ctor = getTypedArrayCtor(maxValue);
    return new ctor(length);
}

export function getTAfromSizedIterable(maxValue: number, length: number, source: Iterable<number>) {
    const ctor = getTypedArrayCtor(maxValue);
    return ctor.from(Object.assign(source, { length }));
}

export function getTypedArrayCtor(maxValue: number) {
    if (maxValue < 2 ** 8) {
        return Uint8Array;
    } else if (maxValue < 2 ** 16) {
        return Uint16Array;
    } else if (maxValue < 2 ** 32) {
        return Uint32Array;
    }
}

export function addListenerMulti(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
}

export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


/**
 * Devuelve una promesa que se resuelve con el resultado de leer el contenido del
 * inputFile como texto
 */
export function readUploadedFileAsText(inputFile: Blob, encoding: string) {
    const temporaryFileReader = new FileReader();

    return new Promise<string>((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException('Problem parsing input file.'));
        };

        temporaryFileReader.onload = () => {
            resolve(<string>temporaryFileReader.result);
        };
        temporaryFileReader.readAsText(inputFile, encoding);
    });
}

/**
 * Devuelve una promesa que se resuelve con el resultado de leer el contenido del
 * inputFile como texto
 */
export function readUploadedFileAsBinary(inputFile: Blob) {
    const temporaryFileReader = new FileReader();

    return new Promise<ArrayBuffer>((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException('Problem parsing input file.'));
        };

        temporaryFileReader.onload = () => {
            resolve(<ArrayBuffer>temporaryFileReader.result);
        };
        temporaryFileReader.readAsArrayBuffer(inputFile);
    });
}

/**
 * Obtiene un formData a partir de un objeto Typescript que puede incluir ficheros.
 */
export function createFormData(object: any, form?: FormData, namespace?: string): FormData {
    const formData = form || new FormData();
    for (const property in object) {
        if (!object.hasOwnProperty(property) || !object[property]) {
            continue;
        }
        const formKey = namespace ? `${namespace}[${property}]` : property;
        const propValue = object[property];
        if (propValue instanceof Date) {
            formData.append(formKey, propValue.toISOString());
        } else if (propValue instanceof File) {
            formData.append(formKey, propValue, propValue.name);
        } else if (propValue instanceof Uint8Array) {
            throw Error('No se permite usar archivo como Uint8Array');
        } else if (typeof propValue === 'object') {
            createFormData(propValue, formData, formKey);
        } else {
            formData.append(formKey, propValue);
        }
    }
    return formData;
}


/**
 * Obtiene el nombre del fichero cómo aparece en la url
 */
export function getFilenameFromUrl(url: string): string {
    const pathname = new URL(url).pathname;
    const index = pathname.lastIndexOf('/');
    return (-1 !== index ? pathname.substring(index + 1) : pathname);
}
