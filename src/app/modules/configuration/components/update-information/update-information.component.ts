import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ViewEncapsulation } from '@angular/core';

import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { UpdateInformation } from '../../state/updateInformation';

@Component({
  selector: 'cvn-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.scss', '../configuration.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateInformationComponent implements OnInit, OnChanges {

  @Input() data: UpdateInformation[];
  @Input() isLoadingData: boolean;
  public stateActualization: State = { skip: 0, take: 5 };
  public gridDataActualization: GridDataResult;

  constructor() {
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    const currentData: SimpleChange = changes.data;
    if (currentData) {
      if (currentData.currentValue)
        this.gridDataActualization = process(this.data, this.stateActualization);
    }
  }

  public dataStateChangeActualization(state: DataStateChangeEvent): void {
    this.stateActualization = state;
    this.gridDataActualization = process(this.data, this.stateActualization);
  }

  public validateUpdateState(val: string): boolean {
    val = val.toUpperCase();
    return val === 'VALIDATED' || val === 'IMPORTED';
  }

  public validateOutdatedState(val: string): boolean {
    val = val.toUpperCase();
    return val === 'ERROR';
  }

  public validateInProgressState(val: string): boolean {
    val = val.toUpperCase();
    return val === 'VALIDATING' || val === 'IMPORTING';
  }

}
