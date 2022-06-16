import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { HttpClient } from '@angular/common/http';
import { Trip } from './trip.model';

@Injectable()
export class TripTableService extends GenericTableService<Trip> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'trip');
    }
}
