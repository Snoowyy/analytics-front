import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cvn-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.scss']
})
export class TaxFormComponent implements OnInit {
  public taxForm: FormGroup;
  @Output() close: EventEmitter<string> = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeTaxForm();
  }

  public initializeTaxForm(): void {
    this.taxForm = this._formBuilder.group({
      gtin: [null, Validators.required],
      name: [null, Validators.required],
    });
  }

  public emitClose(): void {
    this.close.emit('isActiveTaxFormWindow');
  }

  public saveTax() { }

}
