import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { City } from './city.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CityTableService extends GenericTableService<City> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'city');
    }
}
