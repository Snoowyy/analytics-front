import { ID } from '@datorama/akita';
import { Entity } from 'src/app/shared/models/_shared_';
import { Date_, Bool, StructValue } from 'src/vendoring/arrow-js/type';
import { PartialJson } from 'src/app/modules/core/shared';

export interface UseDefModule extends Entity {
  StartMoment: Date_;
  EndMoment: Date_;
  IsTrial: Bool;
}

export function createUseDefModule(params: PartialJson<UseDefModule>) {
  return {

  } as StructValue<UseDefModule>;
}
