import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { HttpClient } from '@angular/common/http';
import { CediRequirements } from '.';

@Injectable()
export class CediRequirementsTableService extends GenericTableService<CediRequirements> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'cedirequirements');
    }
}
