import { Component, OnInit } from '@angular/core';

import { State, process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import * as dataMock from '../../fake-data/fake-data';

@Component({
  selector: 'cvn-send-results',
  templateUrl: './send-results.component.html',
  styleUrls: ['./send-results.component.scss', '../configuration.component.scss']
})
export class SendResultsComponent implements OnInit {

  public data;
  public openDialogMail = false;
  public stateUsermail: State = { skip: 0, take: 6 };
  public gridUsermail: GridDataResult;
  public uploadSaveUrl = 'saveUrl';
  public uploadRemoveUrl = 'removeUrl';

  constructor() {
    this.data = dataMock;
  }

  ngOnInit() {
    this.gridUsermail = process(this.data.userEmail, this.stateUsermail);
  }

  public dataStateUserEmail(state: DataStateChangeEvent): void {
    this.stateUsermail = state;
    this.gridUsermail = process(this.data.userEmail, this.stateUsermail);
  }

  public closeDIalogMail(status) {
    this.openDialogMail = false;
  }

  public openDialog() {
    this.openDialogMail = true;
  }

}
