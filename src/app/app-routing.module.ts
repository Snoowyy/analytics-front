import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './modules/auth/services/auth-guard/auth-guard.service';
import { AppComponent } from './app.component';
import {ContainerPowerbiComponent} from './components/container-powerbi/container-powerbi.component';

const routes: Routes = [
  {
    path: 'sales',
    loadChildren: './modules/sales/sales.module#SalesModule',
    canActivate: [AuthGuardService],
    data: {
      state: '??',
      image: 'assets/images/sales-icon.png',
      name: 'Gestión Comercial',
      iconClass: 'fa fa-tag fa-2x'
    }
  },
  {
    path: 'inventory',
    loadChildren: './modules/inventory/inventory.module#InventoryModule',
    canActivate: [AuthGuardService],
    data: {
      state: '??',
      image: 'assets/images/replenishment-icon.png',
      name: 'Gestión de Abastecimiento',
      iconClass: 'fa fa-archive fa-2x'
    }
  },
  {
    path: 'commercial-management-supply',
    component: ContainerPowerbiComponent,
    canActivate: [AuthGuardService],
    data: {
      state: '??',
      image: 'assets/images/replenishment-icon.png',
      name: 'Gestión comercial y abastecimiento',
      iconClass: 'fa fa-shopping-cart fa-2x'
    }
  },
  {
    path: 'configuration',
    loadChildren: './modules/configuration/configuration.module#ConfigurationModule',
    data: {
      state: '??',
      image: 'assets/images/config-icon.png',
      name: 'Configuración',
      iconClass: 'fa fa-cog fa-2x'
    }
  },
  {
    path: 'select',
    component: AppComponent,
    resolve: {
      url: 'externalUrlRedirectResolver'
    },
  },
  {
    path: '**',
    redirectTo: 'sales'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
