import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { DepartmentStore } from './department.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DepartmentService {

  constructor(private departmentStore: DepartmentStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.departmentStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.departmentStore.add(entity);
    // });
  }

}
