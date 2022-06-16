import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './state';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { BussinessUnitTableService } from './state';

export const ROOT_INJECTOR_AUTH_PROVIDERS = [
  AuthService,
  AuthGuardService,
  BussinessUnitTableService
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [

  ]
})
export class AuthModule { }
