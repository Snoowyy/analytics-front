import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SeeGraphicAnalysisService } from '../../services/seeGraphicAnalysis/see-graphic-analysis.service';

@Component({
  selector: 'cvn-graphic-title',
  templateUrl: './graphic-title.component.html',
  styleUrls: ['./graphic-title.component.scss']
})
export class GraphicTitleComponent implements OnInit {

  @Input() title: string;
  @Input() renderValue: number;

  constructor(
    private seeGraphicAnalysisService: SeeGraphicAnalysisService
  ) { }

  ngOnInit() { }

  public showGraphicAnalysis(): void {
    this.seeGraphicAnalysisService.showGraphicAnalysis();
  }

}
