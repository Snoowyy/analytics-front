import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { VehicleCategory } from './vehicle-category.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VehicleCategoryTableService extends GenericTableService<VehicleCategory> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'vehiclecategory');
    }
}
