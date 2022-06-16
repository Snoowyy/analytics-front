import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { UploadedFile } from './uploadedfile.model';
import { ArrowState, ArrowStore } from 'src/app/shared/arrow-akita';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'bussiness-vehicle-type' })
export class UploadedFileStore extends Store<UploadedFile> {
  constructor() {
    const stored = <any>{};
    super({
      ...createInitialState(),
      ...stored
    });
  }

  updateState(newState: UploadedFile){
    this.update(newState);
  }
}

export function createInitialState(): UploadedFile {
  return {
    File: null,
    Module_id: null,
    Name: null,
    Processed: null,
    id: null,
    validation_result: null
  };
}

