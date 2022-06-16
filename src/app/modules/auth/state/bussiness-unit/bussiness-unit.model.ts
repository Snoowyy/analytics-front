
import { Entity, ForeignKey, NestedArrowValues } from 'src/app/shared/models/_shared_';
import { Utf8, StructValue, Int } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';
import { EconomicSector } from '../economic-sector';

export interface BussinessUnit extends Entity {
  Name: Utf8;
  EconomicSector_id: ForeignKey;
  Enterprise_id: ForeignKey;
  Enterprise__id: ForeignKey;
  Gln: Int<number>;
  ImageUrl: Utf8;
}

// tslint:disable-next-line:interface-over-type-literal
export type BussinesToManyRels = {
  EconomicSector: EconomicSector
};

export type BussinessUnit_ = StructValue<BussinessUnit> & NestedArrowValues<BussinesToManyRels>;


export function createBussinessUnit(params: PartialJson<BussinessUnit>) {
  return {

  } as StructValue<BussinessUnit>;
}
