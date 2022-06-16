import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SeeGraphicAnalysisService {

  private eventSeeGraphicAnalysis = new BehaviorSubject<boolean>(false);

  constructor() { }

  eventShow$ = this.eventSeeGraphicAnalysis.asObservable();

  showGraphicAnalysis() {
    this.eventSeeGraphicAnalysis.next(true);
  }
}
