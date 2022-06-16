import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';


export class UserTableService extends GenericTableService<User> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'user');
    }
}
