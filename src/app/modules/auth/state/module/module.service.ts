import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { ModuleStore } from './module.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ModuleService {

  constructor(private moduleStore: ModuleStore,
    private http: HttpClient) {
  }

  get() {
  }

  add() {
  }

}
