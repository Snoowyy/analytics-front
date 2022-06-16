import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { Department } from './department.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

export interface DepartmentState extends ArrowState<Department> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'department' })
export class DepartmentStore extends ArrowStore<DepartmentState, Department> {

  constructor() {
    super();
  }

}

