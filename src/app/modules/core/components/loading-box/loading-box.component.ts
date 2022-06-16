import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cvn-loading-box',
  template: `
    <div class="loadingBox">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    </div>
  `,
  styleUrls: ['./loading-box.component.scss']
})
export class LoadingBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
