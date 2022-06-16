import { Injectable } from '@angular/core';
import { UploadedFileStore } from './uploadedfile.store';
import { UploadedFile } from './uploadedfile.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class UploadedFileQuery extends Query<UploadedFile> {

  select$ = this.select(it => it);
  constructor(protected store: UploadedFileStore) {
    super(store);
  }

}
