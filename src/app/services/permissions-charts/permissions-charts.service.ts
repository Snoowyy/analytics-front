import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import {Submodules,  SubmodulesQuery } from 'src/app/state/submodules'; 

@Injectable()
export class PermissionsChartService {

  public submodules$: Observable<Submodules[]>;
  public submodules: Submodules | any;
  visibility: boolean;

  constructor(
    private submoduleQuery: SubmodulesQuery
  ) { }

  public getDataCharts(item_menu, id_chart) { 

    this.visibility = false
    this.submodules$ = this.submoduleQuery.get();
    this.submodules$.subscribe((res: Submodules[]) => {
        this.submodules = res
        if( this.submodules ){
          if(this.submodules.length > 0){ 
            this.submodules.forEach(sub => {
              if (sub.path == item_menu){
                sub.charts.forEach(element => {
                  if (element.name_chart == id_chart){
                      this.visibility = true
                    }
                  });
                }
              });
            }
            return this.visibility
        }
    });
    return this.visibility
  }

}
