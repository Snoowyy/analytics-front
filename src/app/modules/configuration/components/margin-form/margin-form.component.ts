import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cvn-margin-form',
  templateUrl: './margin-form.component.html',
  styleUrls: ['./margin-form.component.scss']
})
export class MarginFormComponent implements OnInit {
  public marginForm: FormGroup;
  @Output() close: EventEmitter<string> = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeMarginForm();
  }

  public initializeMarginForm(): void {
    this.marginForm = this._formBuilder.group({
      gtin: [null, Validators.required],
      gln_retailer_location: [null, Validators.required],
      margin: [null, Validators.required],
    });
  }

  public emitClose(): void {
    this.close.emit('isActiveMarginFormWindow');
  }

  public saveMargin() { }

}
