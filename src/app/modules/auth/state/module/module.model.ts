import { ID } from '@datorama/akita';
import { Entity } from 'src/app/shared/models/_shared_';
import { Utf8, Int, StructValue } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';

export interface Module extends Entity {
  Name: Utf8;
  Description: Utf8;
  KpiHeader: Utf8;
  Arrown: Utf8;
  Kpi: Utf8;
  KpiFooter: Utf8;
  KpiText: Utf8;
  Color: Utf8;
  BaseImage: Utf8;
  CvnPath: Utf8;
  Position: Int<number>;
}

export function createModule(params: PartialJson<Module>) {
  return {

  } as StructValue<Module>;
}
