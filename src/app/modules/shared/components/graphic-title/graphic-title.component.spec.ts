import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GraphicTitleComponent } from './graphic-title.component';
import { SeeGraphicAnalysisService } from 'src/app/modules/shared/services/seeGraphicAnalysis/see-graphic-analysis.service';

describe('GraphicTitleComponent', () => {
  let component: GraphicTitleComponent;
  let fixture: ComponentFixture<GraphicTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicTitleComponent],
      providers: [SeeGraphicAnalysisService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input() title', () => {
    const expected = 'VENTAS POR CLIENTE';
    component.title = expected;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.titletop__title').innerText).toEqual(expected);
  });

  it('should be executed showGraphicAnalysis() function when clicking on button #btnAnalysis', () => {
    spyOn(component, 'showGraphicAnalysis');
    const btnAnalysis = fixture.debugElement.query(By.css('#btnAnalysis')).nativeElement;
    btnAnalysis.click();
    fixture.detectChanges();
    expect(component.showGraphicAnalysis).toHaveBeenCalled();
  });

});
