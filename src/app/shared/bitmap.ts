import { range } from 'linq-es2015';
import { SizedIterable } from './models/types';

const _cols = 8;
const _shift = 3;
const _largeShift = 5;
const _largeCols = 32;
const _1s = 2 ** _cols - 1;

function fromIterator<T>(source: () => Iterator<T>, length: number)
    : SizedIterable<T> {
    return {
        [Symbol.iterator]: source,
        length: length
    };
}

export interface IBitmap {
    get(off: number): boolean;
    getPositions(): Iterable<number>;
    count(): number;
    andBitmap(other: IBitmap): IBitmap;
    clone(): this;
}

export class All1Bitmap implements IBitmap {
    constructor(private readonly length: number) { }

    get(off: number): boolean {
        return true;
    }

    count() {
        return this.length;
    }

    getPositions() {
        return range(0, this.length);
    }

    andBitmap(other: IBitmap): IBitmap {
        if (other instanceof All1Bitmap) {
            return this;
        }
        return other.clone();
    }

    clone(): this {
        return new All1Bitmap(this.length) as this;
    }
}


// tslint:disable:no-bitwise
export class Bitmap implements IBitmap {
    private _rows: number;
    private _binu8: Uint8Array;
    private _bini32: Int32Array;
    length: number;

    constructor(public lengthOrBitmap: number | Bitmap) {
        if (lengthOrBitmap instanceof Bitmap) {
            this.createFromBitmap(lengthOrBitmap);
        } else {
            this.createWithLength(lengthOrBitmap);
        }
    }

    createWithLength(length: number) {
        this._rows = (length >> _largeShift) + 1;
        const _buffer = new ArrayBuffer(this._rows * _largeCols);
        this._binu8 = new Uint8Array(_buffer);
        this._bini32 = new Int32Array(_buffer);
        this.length = length;
    }

    createFromBitmap(bitmap: Bitmap) {
        this._rows = bitmap._rows;
        const _buffer = bitmap._bini32.buffer.slice(0);
        this._binu8 = new Uint8Array(_buffer);
        this._bini32 = new Int32Array(_buffer);
        this.length = bitmap.length;
    }

    getPositions() {
        const { _rows, length: length, _binu8 } = this;
        function* _toPositions() {
            for (let ir = 0; ir < _rows; ir++) {
                const row = _binu8[ir];
                if (row === 0) { continue; }
                for (let ic = _cols - 1; ic >= 0; ic--) {
                    const bit = 1 << ic;
                    if ((row & bit) > 0) {
                        const i = ir * _cols + (_cols - ic);
                        if (i < length) {
                            yield i;
                        }
                    }
                }
            }
        }

        return fromIterator(_toPositions, length);
    }

    andBitmap(other: Bitmap): IBitmap {
        if (this.length !== other.length) {
            throw new Error('Los dos bitmaps deben ser de la misma longitud');
        }

        if (other instanceof All1Bitmap) {
            return this;
        }

        const { _bini32 } = this;
        const _otherBin = other._bini32;
        const { length } = _bini32;
        for (let i = 0; i < length; i++) {
            _bini32[i] &= _otherBin[i];
        }
        return this;
    }

    clone(): this {
        return new Bitmap(this) as this;
    }

    orIter(iter: Iterable<number>) {
        for (const pos of iter) {
            this.or(pos, true);
        }
        return this;
    }

    bitCount(n: number) {
        // Taked from
        //   https://stackoverflow.com/questions/43122082/efficiently-count-the-number-of-bits-in-an-integer-in-javascript
        n = n - ((n >> 1) & 0x55555555);
        n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
        return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
    }

    count() {
        let c = 0;
        const { _bini32 } = this;
        for (const n of _bini32) {
            c += this.bitCount(n);
        }
        return c;
    }

    // Gets the bool at offset
    get(off: number) {
        const row = off >> _shift;
        const col = off % _cols;
        const bit = 1 << col;
        return (this._binu8[row] & bit) > 0;
    }

    // Sets a bit at offset to bool
    set(off: number, bool: boolean) {
        const row = off >> _shift;
        const col = off % _cols;
        let bit = 1 << col;
        if (bool) {
            this._binu8[row] |= bit;
        } else {
            bit = _1s ^ bit;
            this._binu8[row] &= bit;
        }
    }

    // Flip a single bit at offset
    flip(off: number) {
        const row = Math.floor(off / _cols);
        const col = off % _cols;
        const bit = 1 << col;
        this._binu8[row] ^= bit;
    }

    and(off: number, value: boolean) {
        if (value) {
            return;
        }

        const row = Math.floor(off / _cols);
        const col = off % _cols;
        const bit = (_1s - 1) << col;
        this._binu8[row] &= bit;
    }

    or(off: number, value: boolean) {
        if (!value) {
            return;
        }

        const row = Math.floor(off / _cols);
        const col = off % _cols;
        const bit = 1 << col;
        this._binu8[row] |= bit;
    }

    // Reset to all 1's
    fill() {
        for (let i = 0; i < this._rows; i++) {
            this._binu8[i] = _1s;
        }
        return this;
    }

    // Reset to all 0's
    clear() {
        for (let i = 0; i < this._rows; i++) {
            this._binu8[i] = 0;
        }
    }
}
