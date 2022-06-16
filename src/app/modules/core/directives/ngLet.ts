// Adapted from
// https://github.com/ngrx-utils/ngrx-utils/blob/d49d2aae1a5727f316f3c06d0eee7864b8eba0b3/projects/store/src/directives/ngLet.ts

import { NgModule, Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

export class NgLetContext {
  $implicit: any = null;
  ngLet: any = null;
}

@Directive({
  selector: '[ngLet]'
})
export class NgLetDirective implements OnInit {
  private _context = new NgLetContext();

  @Input()
  set ngLet(value: any) {
    this._context.$implicit = this._context.ngLet = value;
  }

  constructor(private _vcr: ViewContainerRef, private _templateRef: TemplateRef<NgLetContext>) { }

  ngOnInit() {
    this._vcr.createEmbeddedView(this._templateRef, this._context);
  }
}
