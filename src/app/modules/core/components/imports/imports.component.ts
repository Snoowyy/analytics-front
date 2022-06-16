import { Component, OnInit, Injectable, Input } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { LoadingStatus } from './utils';
import { FileRestrictions, FileInfo, SelectEvent, UploadEvent } from '@progress/kendo-angular-upload';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpProgressEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { delay } from 'rxjs/operators/delay';
import { NgForm } from '@angular/forms';
import { UploadedFile } from './utils';
import * as uF from 'src/app/modules/core/state/core/uploadedfile/uploadedfile.model';
import { UploadedFileQuery, UploadedFileTableService, UploadedFileService, ValidationResult } from '../../state/core';
import { map, catchError, tap } from 'rxjs/operators';
import linq from 'linq-es2015';
import { ReplaySubject } from 'rxjs';
import { ApiResponseData } from 'src/app/shared/models/types';

@Component({
  selector: 'cvn-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.scss']
})
export class ImportsComponent implements OnInit {

  routes;
  public uploadSaveUrl = 'saveUrl';
  public uploadRemoveUrl = 'removeUrl';

  public state: State = {
    skip: 0,
    take: 10,
  };

  step = 1;

  uploadedFile: UploadedFile;

  filerestriction: FileRestrictions = {
    allowedExtensions: ['.xlsx', '.xls', '.csv']
  };

  resultValidationData$: any;

  loading = LoadingStatus.waiting;

  validationResult$: ReplaySubject<any> = new ReplaySubject<any>(1);

  @Input() ModulePrefix: string;
  @Input() useBulkValidation: boolean;
  checkMode: string;
  serviceProxy: {};

  constructor(
    private uploadedFileQuery: UploadedFileQuery,
    private uploadedFileService: UploadedFileService,
  ) { }
  public gridDataImport: GridDataResult;
  public gridDataDetail: GridDataResult;


  ngOnInit() {
    this.uploadedFile = { file: null, module_cvnpath: this.ModulePrefix, isbulk: null};
    this.uploadedFileService.validationResponse$.subscribe(
      it => {
        this.validationResult$.next(it);
        this.nextButton();
      }
    );
    this.isTransport();
  }

  isTransport() {
    if (this.useBulkValidation) {
      if (localStorage.hasOwnProperty('checkMode')) {
        this.uploadedFile.isbulk = localStorage.getItem('checkMode');
      } else {
        this.uploadedFile.isbulk = 'nobulk';
      }
    }
  }

  choose(ev) {
    localStorage.setItem('checkMode', this.uploadedFile.isbulk);
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid) {
      this.uploadedFileService.saveFile(this.uploadedFile);
    }
  }

  confirm(id: number) {
    this.loading = LoadingStatus.loading;
    this.uploadedFileService.confirm(id, {isbulk: this.uploadedFile.isbulk}).pipe(
      catchError(
        tap(
          err => this.loading = LoadingStatus.error
        )
      )
    ).subscribe(
      it => {
        this.loading = LoadingStatus.completed;
        this.serviceProxy[this.ModulePrefix].resetAllStores();
        this.serviceProxy[this.ModulePrefix].get();
      }
    );
  }

  selectEventHandler(e: SelectEvent) {
    if (e.files.length > 1) {
      e.files.pop();
      e.preventDefault();
    }
    this.uploadedFile.file = e.files[0].rawFile;
  }

  uploadEventHandler(e: UploadEvent) {
    this.uploadedFileService.saveFile(this.uploadedFile);
  }

  nextButton() {
    this.step = this.step + 1;
  }

  resetButton() {
    this.step = 1;
    this.resetObservable();
  }

  prevButton() {
    this.step = this.step - 1;
    this.resetObservable();
  }

  resetObservable() {
    if (this.step === 1) {
      this.validationResult$.next(null);
    }
  }
}
@Injectable()
export class UploadInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'saveUrl') {
      const events: Observable<HttpEvent<any>>[] = [0, 10, 30, 60, 100].map((x) => of(<HttpProgressEvent>{
        type: HttpEventType.UploadProgress,
        loaded: x,
        total: 100
      }).pipe(delay(1000)));

      const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));

      return success;
    }

    if (req.url === 'removeUrl') {
      return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }
}
