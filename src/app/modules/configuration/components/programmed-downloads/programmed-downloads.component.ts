import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { process, State } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { ProgrammedDownload } from '../../state/programmedDownload';
import { Multiselect } from 'src/app/modules/shared/components/multiselect-filter/state';

@Component({
  selector: 'cvn-programmed-downloads',
  templateUrl: './programmed-downloads.component.html',
  styleUrls: ['./programmed-downloads.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgrammedDownloadsComponent implements OnInit, OnChanges {

  @Input() data: ProgrammedDownload[];
  @Input() isLoadingData: boolean;
  @Input() clients: Multiselect[];
  @Output() programmedDownload: EventEmitter<ProgrammedDownload> = new EventEmitter();
  @Output() removeDownload: EventEmitter<number> = new EventEmitter();
  public gridDataDownload: GridDataResult;
  public stateDownload: State = { skip: 0, take: 6 };
  public periodicity: string[];
  public days: string[];
  public filterSettings: DropDownFilterSettings;
  public formProgrammedDownload: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.filterSettings = { caseSensitive: false, operator: 'contains' };
    this.periodicity = ['Diario', 'Semanal', 'Mensual'];
    this.days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentData: SimpleChange = changes.data;
    if (currentData) {
      if (currentData.currentValue)
        this.gridDataDownload = process(currentData.currentValue, this.stateDownload);
    }
  }

  public initializeForm(): void {
    this.formProgrammedDownload = this._formBuilder.group({
      glnretailer: ['', Validators.required],
      periodicity: ['Periodicidad', Validators.required],
      execution_day: ['Día de ejecución', Validators.required]
    });
  }

  public dataStateChangeDownload(state: DataStateChangeEvent): void {
    this.stateDownload = state;
    this.gridDataDownload = process(this.data, this.stateDownload);
  }

  public programmed(): void {
    if (this.isValidFormProgrammedDownload()) {
      let { glnretailer, periodicity, execution_day } = this.formProgrammedDownload.value;
      periodicity = this.normalizePeriodicity(periodicity);
      execution_day = this.normalizeExecutionDay(execution_day);
      glnretailer = this.normalizeGlnProvider(glnretailer);
      this.programmedDownload.emit({ glnretailer, periodicity, execution_day });
    }
  }

  public deleteProgrammedDownload(id: number): void {
    this.removeDownload.emit(id);
  }

  public isValidFormProgrammedDownload(): boolean {
    const { periodicity, execution_day } = this.formProgrammedDownload.value;
    return (this.formProgrammedDownload.valid && periodicity !== 'Periodicidad' && execution_day !== 'Día de ejecución');
  }

  public normalizeExecutionDay(executionDay: string | number): number {
    executionDay = (
      executionDay === 'Lunes'     ? 0 :
      executionDay === 'Martes'    ? 1 :
      executionDay === 'Miercoles' ? 2 :
      executionDay === 'Jueves'    ? 3 :
      executionDay === 'Viernes'   ? 4 :
      executionDay === 'Sabado'    ? 5 :
      executionDay === 'Domingo'   ? 6 :
      null
    );
    return executionDay;
  }

  public normalizePeriodicity(periodicity: string): string {
    periodicity = (
      periodicity === 'Diario' ? 'D' :
      periodicity === 'Semanal' ? 'W' :
      periodicity === 'Mensual' ? 'M' :
      null
    );
    return periodicity;
  }

  public normalizeGlnProvider(glnretailer): number {
    return this.clients.find(it => it.name === glnretailer).gln;
  }
}
