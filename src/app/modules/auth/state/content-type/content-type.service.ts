import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { ContentTypeStore } from './content-type.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContentTypeService {

  constructor(private contentTypeStore: ContentTypeStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.contentTypeStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.contentTypeStore.add(entity);
    // });
  }

}
