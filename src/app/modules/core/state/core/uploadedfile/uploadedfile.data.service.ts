import { HttpClient } from '@angular/common/http';
import { UploadedFile } from './uploadedfile.model';
import { Injectable } from '@angular/core';
import { GenericTableService } from 'src/app/modules/core/dataservices/generic-table.service';

@Injectable()
export class UploadedFileTableService extends GenericTableService<UploadedFile> {
    constructor(
        http: HttpClient,
    ) {
        super(http, 'uploadedfile');
    }
}
