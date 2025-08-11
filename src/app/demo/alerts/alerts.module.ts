import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import AlertsComponent from './alerts.component';
import { AlertRoutingModule } from './alerts-routing.module';



@NgModule({
  declarations: [ AlertsComponent],
  imports: [
    CommonModule,

    SharedModule,
    AlertRoutingModule
  ]

})
export class AlertsModule { }
