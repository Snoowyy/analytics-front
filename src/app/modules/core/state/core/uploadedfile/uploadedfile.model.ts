import { ID } from '@datorama/akita';
import { PartialJson } from 'src/app/modules/core/shared';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';
import { Utf8, StructValue, DataType, Bool } from 'src/vendoring/arrow-js/type';
import { FileInfo } from '@progress/kendo-angular-upload';

export enum row_validation_conventions {
  ok,
  invalid_gtin14,
  inconsistent_UM_quantity,
  inconsistent_weight,
  weight_is_major_than_capacity,
  inconsistent_volume,
  volume_is_major_than_capacity,
  invalid_source_kind,
  invalid_target_kind,
  inconsistent_delivery_date,
  invalid_vehicle_id,
  inconsistent_weight_capacity,
  inconsistent_volume_capacity,
  inconsistent_vehicle_year,
  inconsistent_vehicle_second_year,
  invalid_chasis_type,
  invalid_fuel_type,
  inconsistent_fuel_consumption,
  invalid_transporter,
  inconsistent_delivery_cost,
  inconsistent_product_cost,
  inconsistent_due_date
}

export interface UploadedFile extends Entity {
  Name: Utf8;
  Module_id: ForeignKey;
  validation_result: Utf8;
  File: Utf8;
  Processed: Bool;
}

export function createUploadedFile(params: PartialJson<UploadedFile>) {
  return {

  } as StructValue<UploadedFile>;
}
