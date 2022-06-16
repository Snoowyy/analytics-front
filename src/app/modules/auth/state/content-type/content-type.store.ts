import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { ContentType } from './content-type.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface ContentTypeState extends ArrowState<ContentType> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'content-type' })
export class ContentTypeStore extends ArrowStore<ContentTypeState, ContentType> {

  constructor() {
    super();
  }

}

