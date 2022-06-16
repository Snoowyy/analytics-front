import { HttpClient } from '@angular/common/http';
import { BussinessVehicleType } from './bussiness-vehicle-type.model';
import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';

@Injectable()
export class BussinessVehicleTypeTableService extends GenericTableService<BussinessVehicleType> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'bussinessvehicletype');
    }
}
