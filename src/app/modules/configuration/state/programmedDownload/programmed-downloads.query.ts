import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { QueryEntity } from '@datorama/akita';
import { ProgrammedDownloadsStore, ProgrammedDownloadsState } from './programmed-downloads.store';
import { ProgrammedDownload } from './programmed-download.model';

@Injectable({ providedIn: 'root' })
export class ProgrammedDownloadsQuery extends QueryEntity<ProgrammedDownloadsState, ProgrammedDownload[]> {

  constructor(protected store: ProgrammedDownloadsStore) {
    super(store);
  }

  public get(): Observable<ProgrammedDownload[]> {
    return this.selectEntity('programmedDownloads');
  }

}
