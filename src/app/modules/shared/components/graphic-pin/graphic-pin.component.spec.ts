import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPinComponent } from './graphic-pin.component';
import { DictionaryPipe } from '../../pipes/dictionary/dictionary.pipe';
import { TooltipPopupComponent } from '@progress/kendo-angular-charts';
import { TooltipTemplatePoint } from '@progress/kendo-angular-charts/dist/es2015/chart/tooltip/tooltip-template-point';
import { TooltipDirective, TooltipModule } from '@progress/kendo-angular-tooltip';

describe('GraphicPinComponent', () => {
  let component: GraphicPinComponent;
  let fixture: ComponentFixture<GraphicPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicPinComponent, DictionaryPipe],
      imports: [TooltipModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
