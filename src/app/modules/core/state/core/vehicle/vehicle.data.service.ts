import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '.';

@Injectable()
export class VehicleTableService extends GenericTableService<Vehicle> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'vehicle');
    }
}
