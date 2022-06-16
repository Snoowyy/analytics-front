import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MarginFormComponent } from './margin-form.component';

describe('MarginFormComponent', () => {
  let component: MarginFormComponent;
  let fixture: ComponentFixture<MarginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarginFormComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be emit close event emitter when click on #cancelForm', (done) => {
    const expected = 'isActiveMarginFormWindow';
    const btnCancelForm = fixture.debugElement.query(By.css('#cancelForm')).nativeElement;
    component.close.subscribe(data => {
      expect(data).toEqual(expected);
      done();
    });
    btnCancelForm.click();
    fixture.detectChanges();
  });

});
