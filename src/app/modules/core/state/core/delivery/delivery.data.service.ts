import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';
import { Delivery } from './delivery.model';

@Injectable()
export class DeliveryTableService extends GenericTableService<Delivery> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'delivery');
    }
}
