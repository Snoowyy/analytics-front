import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { UploadedFileStore } from './uploadedfile.store';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap, shareReplay, switchMap, filter } from 'rxjs/operators';
import { ReplaySubject, empty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadedFileTableService } from './uploadedfile.data.service';
import { UploadedFile } from '../../../components/imports/utils';
import * as uF from './uploadedfile.model';
import { UploadedFileQuery } from './uploadedfile.query';
import linq from 'linq-es2015';
import { toApiResponseData } from 'src/app/shared/TableSetUtils';
import * as t from 'src/app/shared/models/types';
import { onlyTuplesWithData } from '../../../shared';
import { ApiResponseData } from 'src/app/shared/models/types';
import { Int, IntArray } from 'src/vendoring/arrow-js/type';
import { row_validation_conventions } from './uploadedfile.model';


declare var jsonic: (string) => any;

export function getConvention(num): string {
  switch (<row_validation_conventions>num) {
    case row_validation_conventions.ok:
      return 'Correcto';
    case row_validation_conventions.inconsistent_UM_quantity:
      return 'La cantidad es demasiado grande o es un número negativo';
    case row_validation_conventions.inconsistent_delivery_cost:
      return 'El costo de despacho no se encuentra entre el rango válido';
    case row_validation_conventions.inconsistent_delivery_date:
      return 'Fecha de despacho inconsistente';
    case row_validation_conventions.inconsistent_due_date:
      return 'La fecha de entrega es inferior a la de despacho';
    case row_validation_conventions.inconsistent_fuel_consumption:
      return 'El valor de consumo de combustible es un número demasiado grande o es negativo';
    case row_validation_conventions.inconsistent_product_cost:
      return 'El costo de producto no se encuentra entre el rango válido';
    case row_validation_conventions.inconsistent_vehicle_second_year:
      return 'El modelo repotenciado del vehículo es inconsistente';
    case row_validation_conventions.inconsistent_vehicle_year:
      return 'El modelo del vehículo es inconsistente';
    case row_validation_conventions.inconsistent_volume:
      return 'El valor del volumen es negativo';
    case row_validation_conventions.inconsistent_volume_capacity:
      return 'La capacidad de volumen del vehículo es superior al estándar';
    case row_validation_conventions.inconsistent_weight:
      return 'El valor del peso es negativo';
    case row_validation_conventions.inconsistent_weight_capacity:
      return 'La capacidad de peso es superior al estándar';
    case row_validation_conventions.invalid_chasis_type:
      return 'El valor debe encontrarse entre 1 y 7';
    case row_validation_conventions.invalid_fuel_type:
      return 'El valor debe encontrarse entre 1 y 4';
    case row_validation_conventions.invalid_gtin14:
      return 'El código no tiene la longitud adecuada';
    case row_validation_conventions.invalid_source_kind:
      return 'El valor debe encontrarse entre 1 y 4';
    case row_validation_conventions.invalid_target_kind:
      return 'El valor debe encontrarse entre 1 y 4';
    case row_validation_conventions.invalid_transporter:
      return 'El valor debe encontrarse entre 1 y 3';
    case row_validation_conventions.invalid_vehicle_id:
      return 'El Id del vehículo no tiene la longitud adecuada';
    case row_validation_conventions.volume_is_major_than_capacity:
      return 'El volumen excede la capacidad del vehículo';
    case row_validation_conventions.weight_is_major_than_capacity:
      return 'El peso excede la capacidad del vehículo';
    default:
      throw Error('Convención no soportada');
  }
}

export function setRowValidation(it, rowKeys) {
  let jsonVal = {};
  for (let index = 0; index < rowKeys.length; index++) {
    jsonVal[formatTitle(rowKeys[index])] = index > 0 ? getConvention(it[rowKeys[index].name][0]) : (it[rowKeys[index].name][0] + 1);
  }
  return jsonVal;
}

export function formatTitle(str) {
  return str.name.trim().replace('(', '_').replace(')', '').replace(/\s/g, '_');
}

@Injectable({ providedIn: 'root' })
export class UploadedFileService {

  uploadedFile$ = new ReplaySubject<UploadedFile>(1);

  constructor(
    private updateFileStore: UploadedFileStore,
    private updateFileQuery: UploadedFileQuery,
    private http: HttpClient,
    private uploadedFileDataService: UploadedFileTableService
    ) {
  }

  validationResponse$ = this.updateFileQuery
    .select(it => it)
    .pipe(
      filter(it => it.id !== null),
      switchMap(it => this.showValidationResult(it)),
      map(this.mapToResponseTable)
    );

  mapToResponseTable(it: ResponseToConfirm) {
    const colVal = linq(it.response.ts.columns_validation.table).Select(it2 => ({ column: it2.column, statement: it2.statement[0] })).ToArray();
    const rowKeys = it.response.ts.rows_validation.table.schema.fields;
    const rowVal = linq(it.response.ts.rows_validation.table).Select(it2 => setRowValidation(it2, rowKeys)).ToArray();
    const grlVal = linq(it.response.ts.general_validation.table)
      .Select(it2 => ({
        expected_number_col: it2.expected_number_col[0],
        is_all_correct: it2.is_all_correct[0],
        real_number_col: it2.real_number_col[0]
      })).ToArray();
    return {
      columnValidationResult: colVal,
      rowValidationResult: { rows: rowVal, keys: rowKeys.map(x => formatTitle(x))},
      generalValidationResult: grlVal,
      isValid: { valid: linq(grlVal).FirstOrDefault().is_all_correct, id: it.id}
    };
  }

  setApiResponse(data: uF.UploadedFile) {
    this.updateFileStore.updateState(data);
  }

  showValidationResult(it: uF.UploadedFile): Observable<ResponseToConfirm> {
    return this.http.get(
      `${environment.gatewayUrl}/media/${it.validation_result}`,
      {
        responseType: 'arraybuffer'
      }
    )
    .pipe(
      map(it2 => (<ResponseToConfirm>{
        response: toApiResponseData<ValidationResult>(it2),
        id: it.id
      })),
      shareReplay()
    );
  }

  confirm(it: number, obj: {}) {
    return this.uploadedFileDataService.importConfirmPost(it, obj);
  }

  saveFile(it: UploadedFile) {
    return this.uploadedFileDataService.importValidatePost(it)
      .subscribe(
        it2 => {
          this.setApiResponse(it2);
        }
      );
  }

}

export interface ResponseToConfirm {
  response: t.ApiResponseData<ValidationResult>;
  id: Int<number, IntArray>;
}
export interface ValidationResult extends t.StructDataSet {
  general_validation: any;
  columns_validation: any;
  rows_validation: any;
}
