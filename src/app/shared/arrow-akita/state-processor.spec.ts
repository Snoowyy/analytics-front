import { StateProcessor } from './state-processor';
import { State } from '@progress/kendo-data-query';
import { dataGenerator } from 'src/app/fake-data/CfDeliveryResult.data.spec';
import { StructValue } from '../../../vendoring/arrow-js/type';

describe('StateProcessor', () => {

    function testState(state: State) {
        const processor = new StateProcessor(state);
        return processor.process(dataGenerator, false, it => it);
    }

    it('should take first 10 elements', () => {
        expect(testState({ skip: 0, take: 10 }).Count()).toEqual(10);
    });

    it('should take first 0 elements', () => {
        expect(testState({ skip: 0, take: 0 }).Count()).toEqual(0);
    });

    it('should take 10 elements, skipping 20 first elements', () => {
        expect(testState({ skip: 20, take: 10 }).Count()).toEqual(10);
    });

    it('should filter out all elements, when filtering by number Date<0', () => {
        expect(testState({
            filter: {
                logic: 'and',
                filters: [{
                    field: 'Date',
                    operator: 'lt',
                    value: 0
                }]
            }
        }).Count()).toEqual(0);
    });

    it('should sort by Date (number) ascending', () => {
        expect(
            isSortedAsc(testState({ sort: [{ field: 'Date', dir: 'asc' }] })
                .Select(it => it.Date))
        ).toBeTruthy();
    });

    it('should sort by Date (number) descending', () => {
        expect(
            isSortedDesc(testState({ sort: [{ field: 'Date', dir: 'desc' }] })
                .Select(it => it.Date))
        ).toBeTruthy();
    });
});

function isSortedAsc(source: Iterable<number>) {
    let oldValue = -Number.MAX_VALUE;
    for (const value of source) {
        if (oldValue > value) {
            return false;
        }
        oldValue = value;
    }
    return true;
}



function isSortedDesc(source: Iterable<number>) {
    let oldValue = Number.MAX_VALUE;
    for (const value of source) {
        if (oldValue < value) {
            return false;
        }
        oldValue = value;
    }
    return true;
}
