import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData, DatePipe } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { enableAkitaProdMode, akitaConfig } from '@datorama/akita';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/user-service/user-service.service';
import { PermissionsChartService } from './services/permissions-charts/permissions-charts.service';
import { ROOT_INJECTOR_CORE_PROVIDERS, CoreModule } from './modules/core/core.module';
import { ROOT_INJECTOR_AUTH_PROVIDERS, AuthModule } from './modules/auth/auth.module';
import { AppComponent } from './app.component';
import { ServiceLevelComponent } from './components/service-level/service-level.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { environment } from 'src/environments/environment';
import { SharedModule } from './modules/shared/shared.module';
import {PowerbiComponent} from './components/powerbi/powerbi.component';
import {ContainerPowerbiComponent} from './components/container-powerbi/container-powerbi.component';
import {NgxPowerBiModule} from 'ngx-powerbi';

export function getToken() {
  return '';
}
@NgModule({
  declarations: [
    AppComponent,
    ServiceLevelComponent,
    NotFoundComponent,
    UserComponent,
    HeaderComponent,
    DialogErrorComponent,
    ContainerPowerbiComponent,
    PowerbiComponent
  ],
  entryComponents: [DialogErrorComponent],
  imports: [
    AppRoutingModule,
    NgxPowerBiModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    LeafletModule.forRoot(),
    ReactiveFormsModule,
    SharedModule.forRoot(),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    NgxPowerBiModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ...ROOT_INJECTOR_AUTH_PROVIDERS,
    ...ROOT_INJECTOR_CORE_PROVIDERS,
    UserService,
    PermissionsChartService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'externalUrlRedirectResolver',
      useValue: () => {
        window.location.href = '/select';
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    enableAkitaProdMode();
    akitaConfig({
      resettable: true
    });
    registerLocaleData(localeEs, 'es');
  }
}
