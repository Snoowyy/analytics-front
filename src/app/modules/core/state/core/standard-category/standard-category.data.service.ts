import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { HttpClient } from '@angular/common/http';
import { StandardCategory } from '.';

@Injectable()
export class StandardCategoryTableService extends GenericTableService<StandardCategory> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'standardcategory');
    }
}
