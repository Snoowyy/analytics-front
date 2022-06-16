import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { FuelType } from './fuel-type.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FuelTypeTableService extends GenericTableService<FuelType> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'fueltype');
    }
}
