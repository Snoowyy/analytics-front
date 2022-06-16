
import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { HttpClient } from '@angular/common/http';
import { LocationKind } from '.';

@Injectable()
export class LocationKindTableService extends GenericTableService<LocationKind> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'location-kind');
    }
}
