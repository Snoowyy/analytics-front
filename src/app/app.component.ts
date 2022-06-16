import { Component } from '@angular/core';
import { MultiselectService } from './modules/shared/components/multiselect-filter/state';
import { PinnedService } from './state/pinned';
import { SubmoduleService } from './state/submodules';

@Component({
  selector: 'cvn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { 
  title = 'analytics-frontend';

  constructor(
    private multiselectService: MultiselectService,
    private pinnedService: PinnedService,
    private submoduleService: SubmoduleService
  ) {
    this.getMultiselectOptions();
    this.getDataPinned();
    this.getDataSubmodules();
  }

  getMultiselectOptions(): void {
    this.multiselectService.get();
  }

  getDataPinned(): void {
    this.pinnedService.getDataPinned();
  }

  getDataSubmodules(): void {
    this.submoduleService.getSubmodules();
  } 
}
