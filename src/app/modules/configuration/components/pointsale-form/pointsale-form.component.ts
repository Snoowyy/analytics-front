import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';

@Component({
  selector: 'cvn-pointsale-form',
  templateUrl: './pointsale-form.component.html',
  styleUrls: ['./pointsale-form.component.scss']
})
export class PointsaleFormComponent implements OnInit {
  public pointsaleForm: FormGroup;
  public stateModalForm: string;
  @Output() close: EventEmitter<string> = new EventEmitter();
  @Output() submit: EventEmitter<{ module: string, file: File, stateModalForm: string }> = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService
  ) {
    this.stateModalForm = 'isActivePointSaleFormWindow';
  }

  ngOnInit() {
    this.initializePointsaleForm();
  }

  public initializePointsaleForm(): void {
    this.pointsaleForm = this._formBuilder.group({
      GlnRetailer: [null, Validators.required],
      GlnBussinessLocation: [null, Validators.required],
      RetailerName: [null, Validators.required],
      InternalCode: [null, Validators.required],
      CustomizerGln: [null, Validators.required],
      Latitude: [null, Validators.required],
      Longitude: [null, Validators.required],
      Label1: [null, Validators.required],
      Label2: [null, Validators.required],
      Label3: [null, Validators.required],
      Label4: [null, Validators.required],
      Name: [null, Validators.required]
    });
  }

  public emitClose(): void {
    this.close.emit(this.stateModalForm);
  }

  public savePointsale(): void {
    if (this.pointsaleForm.valid) {
      const csvContent = this.utilitiesService.generateCsvContent(this.pointsaleForm.value);
      const csvFile = this.utilitiesService.generateCsvFile(csvContent, 'point-sale');

      this.submit.emit({
        module: 'customized_bussinesslocation',
        file: csvFile,
        stateModalForm: this.stateModalForm
      });
    }
  }

}
