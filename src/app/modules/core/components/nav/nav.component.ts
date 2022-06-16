import { Component, OnInit, Input } from '@angular/core';
import { DataRoutes } from 'src/app/modules/core/utils/DataRoute';
import linq from 'linq-es2015';
import {Submodules,  SubmodulesQuery } from 'src/app/state/submodules';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() routes: DataRoutes;

  public submodules$: Observable<Submodules[]>;
  public submodules: Submodules | any;
  constructor(private submoduleQuery: SubmodulesQuery) { }

  ngOnInit() {

    this.submodules$ = this.submoduleQuery.get();
    this.submodules$.subscribe((res: Submodules[]) => {
      this.submodules = res;
    });
    return this.routes = this.submodules;
  }

  getValidation(dataPermissions) {
    return dataPermissions ? dataPermissions.permissions ? dataPermissions.permissions.only ? !dataPermissions.permissions.only.includes('Administrator') : true : true : true;
  }

  gotoRoot() {
    location.href = '/collaborative-analytics-stockout/stockout';
  }
}
