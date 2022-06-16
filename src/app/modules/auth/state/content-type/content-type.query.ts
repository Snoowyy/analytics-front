import { Injectable } from '@angular/core';
import { ContentTypeStore, ContentTypeState } from './content-type.store';
import { ContentType } from './content-type.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class ContentTypeQuery extends QueryArrow<ContentTypeState, ContentType> {

  constructor(protected store: ContentTypeStore) {
    super(store);
  }

}
