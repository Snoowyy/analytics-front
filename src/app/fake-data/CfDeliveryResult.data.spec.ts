import * as faker from 'faker';
import linq, { range } from 'linq-es2015';
// import { CfDeliveryResult } from '../modules/carbon-footprint/state';
import { StructValue } from 'src/vendoring/arrow-js/type';

export const dataGenerator = range(0, 1_000_000).Select(i =>
    <StructValue<any>>{
        BussinessId: faker.random.alphaNumeric(6),
        Date: faker.random.number({ min: 1, max: 2 ** 16 - 1 }),
        EstimationCase: faker.random.number({ min: 1, max: 7 }),
        Footprint: faker.random.number({ min: 1, max: 100, precision: 4 }),
        FuelConsumption: faker.random.number({ min: 2, max: 30000, precision: 4 }),
        PerfomanceIsCalculated: faker.random.boolean(),
        StandardCategory_id: faker.random.number({ min: 1, max: 1000 }),
        Trip_id: faker.random.number({ min: 1, max: 1000 }),
        Vehicle_id: faker.random.number({ min: 1, max: 1000 }),
        Volume: faker.random.number({ min: 2, max: 100, precision: 4 }),
        Weight: faker.random.number({ min: 2, max: 70000, precision: 4 }),
        id: i
    });
