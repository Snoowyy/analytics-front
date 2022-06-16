import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { HttpClient } from '@angular/common/http';
import { Enterprise } from './enterprise.model';


export class EnterpriseTableService extends GenericTableService<Enterprise> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'enterprise');
    }
}
