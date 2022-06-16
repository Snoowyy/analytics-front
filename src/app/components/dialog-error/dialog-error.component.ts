import { Component, Input } from '@angular/core';

@Component({
  selector: 'cvn-dialog-error',
  template: `<div class="dialogError">
  <div class="dialogError__image">
    <img src="{{image}}"/>
  </div>
  <div class="dialogError__description">
    <div class="title">
      {{title}}
    </div>
    <hr>
    <div class="description">
      {{description}}
    </div>
  </div>
</div>`,
  styleUrls: ['./dialog-error.component.scss']
})
export class DialogErrorComponent {

@Input() image: string;
@Input() title: string;
@Input() description: string;

}
