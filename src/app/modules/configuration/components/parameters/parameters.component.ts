import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { SelectEvent, UploadEvent, FileRestrictions } from '@progress/kendo-angular-upload';
import { UploadFileService } from 'src/app/modules/shared/services/uploadFile/upload-file.service';
import * as dataMock from '../../fake-data/fake-data';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface MasterItem {
  id: number;
  name: string;
  state: string;
  success: boolean;
  module?: string;
  errors?: string[];
  uploadedFile?: any;
}

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss', '../configuration.component.scss']
})
export class ParametersComponent implements OnInit {
  @ViewChild('upload') upload;
  public data;
  public uploadSaveUrl = 'saveUrl';
  public uploadRemoveUrl = 'removeUrl';
  public isActiveProductFormWindow = false;
  public isActivePointSaleFormWindow = false;
  public isActiveTaxFormWindow = false;
  public isActiveMarginFormWindow = false;
  public checkedImpuestos = false;
  public checkedMargen = false;
  public masters: MasterItem[];
  public currentUploadedFile;
  public importForm: FormGroup;



  filerestriction: FileRestrictions = {
    allowedExtensions: ['.xlsx', '.xls', '.csv']
  };

  constructor(
    private uploadFileService: UploadFileService,
    private _formBuilder: FormBuilder
  ) {
    this.data = dataMock;
    this.currentUploadedFile = { file: null, module_cvnpath: null, isbulk: 'nobulk' };
    this.masters = [
      {
        id: 1,
        name: 'Maestro de Producto',
        success: false,
        state: 'isActiveProductFormWindow',
        module: 'customized_product',
        errors: [],
        uploadedFile: { file: null, module_cvnpath: null, isbulk: 'nobulk' }
      },
      {
        id: 2,
        name: 'Maestro de Punto de Venta',
        success: false,
        state: 'isActivePointSaleFormWindow',
        module: 'customized_bussinesslocation',
        errors: [],
        uploadedFile: { file: null, module_cvnpath: null, isbulk: 'nobulk' }
      }
    ];
  }

  ngOnInit() {
    this.importForm = this._formBuilder.group({
      file: [null],
    });
  }

  public toggleFormWindow(nameForm: string) {
    this[nameForm] = !this[nameForm];
  }

  public uploadFile(data: MasterItem): void {
    this.uploadFileService.importConfirmPost(this.currentUploadedFile.id, { isbulk: this.currentUploadedFile.isbulk })
      .pipe(
        tap(res => {
          this.currentUploadedFile = this.masters.find(item => item.module === data.module).uploadedFile;
          this.currentUploadedFile.idUpload = res.id;
        })
      ).subscribe();
  }

  public selectEventHandler(e: SelectEvent, item: MasterItem): void {
    if (e.files.length > 1) {
      e.files.pop();
      e.preventDefault();
    }
    this.currentUploadedFile = item.uploadedFile;
    this.currentUploadedFile.file = e.files[0].rawFile;
    this.currentUploadedFile.module_cvnpath = item.module;
  }

  public submitForm(data: { module: string, file: File, stateModalForm: string }): void {
    if (data.file) {
      this.currentUploadedFile = this.masters.find(res => res.module === data.module).uploadedFile;
      this.currentUploadedFile.file = data.file;
      this.currentUploadedFile.module_cvnpath = data.module;

      this.uploadFileService.saveFile(this.currentUploadedFile)
        .pipe(
          map(res => res.body)
        )
        .subscribe(res => {
        this.currentUploadedFile.id = res.id;
        this.toggleFormWindow(data.stateModalForm);
      });
    }
  }

  public cancelUploadFile(e: SelectEvent, item: MasterItem, index: number): void {
    item.uploadedFile.file = null;
    item.uploadedFile.id = null;
    this.currentUploadedFile = item.uploadedFile;
    this.masters[index].errors = [];
    this.masters[index].success = false;
  }

  public validateFile(e: UploadEvent, item: MasterItem, index: number): void {
    this.uploadFileService.saveFile(item.uploadedFile)
      .pipe(
        tap((res) => this.currentUploadedFile = item.uploadedFile),
        map(res => res.body),
        tap(res => {
          this.currentUploadedFile.id = res.id;
          this.masters[index].errors = [];
          this.masters[index].success = true;
        }),
        catchError(err => {
          this.masters[index].success = false;
          this.masters[index].errors = [];
          switch (err.status) {
            case 500:
              this.masters[index].errors.push(`A ocurrido un error interno en el servidor y no fue posible leer el archivo, inténtelo más tarde`);
              break;
            case 400:
              this.masters[index].errors.push(`El archivo tiene un formato inválido`);
              break;
          }
          return throwError(err);
        })
      ).subscribe();
  }

  public showBtnUpload(item): boolean {
    return item.uploadedFile.id && item.uploadedFile.idUpload === undefined;
  }
}
