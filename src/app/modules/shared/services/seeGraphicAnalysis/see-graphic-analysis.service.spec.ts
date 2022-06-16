import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SeeGraphicAnalysisService } from './see-graphic-analysis.service';

describe('SeeGraphicAnalysisService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [SeeGraphicAnalysisService]
  }));

  it('should be created', () => {
    const service: SeeGraphicAnalysisService = TestBed.get(SeeGraphicAnalysisService);
    expect(service).toBeTruthy();
  });
});
