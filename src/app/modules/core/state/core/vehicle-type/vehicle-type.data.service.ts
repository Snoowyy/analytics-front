import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { VehicleType } from './vehicle-type.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VehicleTypeTableService extends GenericTableService<VehicleType> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'vehicletype');
    }
}
