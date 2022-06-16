import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgrammedDownloadsComponent } from './programmed-downloads.component';
import { DictionaryPipe } from 'src/app/modules/shared/pipes/dictionary/dictionary.pipe';
import { By } from '@angular/platform-browser';
import { clients } from '../../fake-data/fake-data';

describe('ProgrammedDownloadsComponent', () => {
  let component: ProgrammedDownloadsComponent;
  let fixture: ComponentFixture<ProgrammedDownloadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgrammedDownloadsComponent, DictionaryPipe],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammedDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should gridDataDownload be true', () => {
    const mock = [
      {
        glnretailer: 1,
        periodicity: 'Semanal',
        execution_day: 'Viernes'
      }
    ];
    const changesObj: SimpleChanges = {
      data: new SimpleChange(null, mock, true)
    };
    component.ngOnChanges(changesObj);
    expect(component.gridDataDownload).toBeTruthy();
  });

  it('should form invalid', () => {
    expect(component.formProgrammedDownload.valid).toBeFalsy();
  });

  it('should initialize form', () => {
    const expected = {
      glnretailer: '',
      periodicity: 'Periodicidad',
      execution_day: 'Día de ejecución'
    };
    component.initializeForm();
    expect(component.formProgrammedDownload.value).toEqual(expected);
  });

  it('should be executed programmed() function when submit on #formProgrammedDownload', () => {
    spyOn(component, 'programmed');
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('#formProgrammedDownload')).triggerEventHandler('submit', fakeEvent);
    expect(component.programmed).toHaveBeenCalled();
  });

  it('should emit programmedDownload event', (done) => {
    const expected = {
      glnretailer: 3,
      periodicity: 'D',
      execution_day: 0
    };
    component.clients = clients;
    component.formProgrammedDownload.controls.glnretailer.setValue('Client 3');
    component.formProgrammedDownload.controls.periodicity.setValue('Diario');
    component.formProgrammedDownload.controls.execution_day.setValue('Lunes');

    component.programmedDownload.subscribe(it => {
      expect(it).toEqual(expected);
      done();
    });
    component.programmed();
  });

  it('should emit removeDownload event', (done) => {
    const mock = 2;
    const expected = 2;

    component.removeDownload.subscribe(it => {
      expect(it).toEqual(expected);
      done();
    });
    component.deleteProgrammedDownload(mock);
  });

});
