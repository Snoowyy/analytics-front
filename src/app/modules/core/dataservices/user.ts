import { GenericTableService } from './generic-table.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from 'src/app/models/user';

@Injectable({ providedIn: 'root' })
export class UserResponseTableService extends GenericTableService<UserResponse> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'user');
    }

}
