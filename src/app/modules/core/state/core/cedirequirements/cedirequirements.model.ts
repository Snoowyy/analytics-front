import { ID } from '@datorama/akita';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, Float, StructValue, Time, Int, Bool } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';

export interface CediRequirements extends Entity {
  Location_id: Int<number>;
  Location: ForeignKey;
  LoadingTimeStart: Time;
  LoadingDuration: Int<number>;
  NumberOfPlatforms: Int<number>;
  VehicleIncompatibilities: ForeignKey;
  RequiresForklift: Bool;
  RequiredDocuments: Utf8;
}

export function createCediRequirements(params: PartialJson<CediRequirements>) {
  return {

  } as StructValue<CediRequirements>;
}
