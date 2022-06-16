import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { HttpClient } from '@angular/common/http';
import { UserBussinessUnit } from './user-bussiness-unit.model';


export class UserBussinessUnitTableService extends GenericTableService<UserBussinessUnit> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'bussinessunit');
    }
}
