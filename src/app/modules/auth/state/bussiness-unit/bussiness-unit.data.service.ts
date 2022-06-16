import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { HttpClient } from '@angular/common/http';
import { BussinessUnit } from './bussiness-unit.model';
import { Injectable } from '@angular/core';
@Injectable()
export class BussinessUnitTableService extends GenericTableService<BussinessUnit> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'bussinessunit');
    }
}
