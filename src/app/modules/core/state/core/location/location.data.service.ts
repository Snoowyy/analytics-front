import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '.';

@Injectable()
export class LocationTableService extends GenericTableService<Location> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'location');
    }
}
