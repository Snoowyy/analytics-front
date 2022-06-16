import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UtilitiesService } from 'src/app/modules/shared/services/utilities/utilities.service';

@Component({
  selector: 'cvn-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public productForm: FormGroup;
  public stateModalForm: string;
  @Output() close: EventEmitter<string> = new EventEmitter();
  @Output() submit: EventEmitter<{ module: string, file: File, stateModalForm: string }> = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService
  ) {
    this.stateModalForm = 'isActiveProductFormWindow';
  }

  ngOnInit() {
    this.initializeProductForm();
  }

  public initializeProductForm(): void {
    this.productForm = this._formBuilder.group({
      IndustrialGln: [null, Validators.required],
      Gtin: [null, Validators.required],
      InternalCode: [null],
      Label1: [null, Validators.required],
      Label2: [null, Validators.required],
      Label3: [null, Validators.required],
      Label4: [null, Validators.required],
      Priority: [null, Validators.required],
      Name: [null, Validators.required],
      ConversionFactor: [null, Validators.required]
    });
  }

  public emitClose(): void {
    this.close.emit(this.stateModalForm);
  }

  public saveProduct(): void {
    if (this.productForm.valid) {
      const csvContent = this.utilitiesService.generateCsvContent(this.productForm.value);
      const csvFile = this.utilitiesService.generateCsvFile(csvContent, 'product');

      this.submit.emit({
        module: 'customized_product',
        file: csvFile,
        stateModalForm: this.stateModalForm
      });
    }
  }
}
