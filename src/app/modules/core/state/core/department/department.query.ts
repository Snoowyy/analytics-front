import { Injectable } from '@angular/core';
import { DepartmentStore, DepartmentState } from './department.store';
import { Department } from './department.model';
import { QueryArrow } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
export class DepartmentQuery extends QueryArrow<DepartmentState, Department> {

  constructor(protected store: DepartmentStore) {
    super(store);
  }

}
