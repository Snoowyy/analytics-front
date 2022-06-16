import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Multiselect } from 'src/app/modules/shared/components/multiselect-filter/state';
import { DownloadInformation } from '../../state/downloadInformation';

@Component({
  selector: 'cvn-download-information',
  templateUrl: './download-information.component.html',
  styleUrls: ['./download-information.component.scss', '../configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DownloadInformationComponent implements OnInit {

  @Input() clients: Multiselect[];
  @Input() isLoadingData: Boolean;
  @Output() download: EventEmitter<DownloadInformation> = new EventEmitter();
  public fileUrl;
  public data;
  public filterSettings: DropDownFilterSettings;
  public formDownloadInformation: FormGroup;

  constructor(
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.filterSettings = { caseSensitive: false, operator: 'contains' };
  }

  ngOnInit() {
    this.formDownloadInformation = this._formBuilder.group({
      glnretailer: ['', Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required]
    });
  }

  public downloadInformation(): void {
    if (this.formDownloadInformation.valid) {
      let { glnretailer, start_date, end_date } = this.formDownloadInformation.value;

      glnretailer = this.normalizeGlnProvider(glnretailer);
      start_date = this.transformDate(start_date);
      end_date = this.transformDate(end_date);
      this.download.emit({ glnretailer, start_date, end_date });
    }
  }

  public transformDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  public normalizeGlnProvider(glnretailer): number {
    return this.clients.find(it => it.name === glnretailer).gln;
  }

}
