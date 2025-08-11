// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import DashAnalyticsComponent from './demo/dash-analytics copy/dash-analytics.component';
import { LoginComponent } from './demo/login/login.component';
import { authGuard } from './guard/auth.guard';
import { LogsComponent } from './demo/logs/logs/logs.component';
import { StockComponent } from './demo/stock/stock.component';
import { DocumentComponent } from './demo/document/document.component';
import { ProductionComponent } from './demo/production/production.component';
import { QualiteComponent } from './demo/qualite/qualite.component';
const routes: Routes = [
  { path: '', component:LoginComponent  },

  { path: 'dashboard ', component: DashAnalyticsComponent },


  {
    path: '',
    component: AdminComponent,
    canActivateChild: [authGuard],

    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },


      {
        path: 'home',
        loadComponent: () => import('./demo/dash-analytics copy/dash-analytics.component')

      },

      { path: 'temperature',
      loadChildren: () => import('./demo/temperature-centre/temperature.module').then(m => m.TemperatureModule)

    },

      {
      path: 'Equipement',
      loadComponent: () => import('./demo/connected-devices/connected-devices.component')
    },


     {
      path: 'alerts',
      loadChildren: () => import('./demo/alerts/alerts.module').then((m) => m.AlertsModule)
    },


      {
        path: 'user',
        loadChildren: () => import('./demo/user-management/user-management.module').then((m) => m.UserManagementModule)
      },
      {
        path: 'logs',
        component :LogsComponent
      },
      {
        path: 'stock',
        component :StockComponent
      },
      {
        path: 'documents',
        component :DocumentComponent
      },
      {
        path: 'production',
        component :ProductionComponent
      },
      {
        path: 'qualite',
        component :QualiteComponent
      },
      {
        path: 'sites',
        loadChildren: () => import('./demo/site-configurations/sites-configurations.module').then((m) => m.SiteConfigurationsModule)

      },



    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
