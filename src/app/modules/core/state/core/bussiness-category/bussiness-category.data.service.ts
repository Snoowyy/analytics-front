import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { BussinessCategory } from './bussiness-category.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BussinessCategoryTableService extends GenericTableService<BussinessCategory> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'bussinesscategory');
    }


}
