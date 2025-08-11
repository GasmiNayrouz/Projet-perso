import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewSiteTemperaturecomponent } from './view-site-temperature/view-site-temperature.component';
import { TemperatureRoutingModule } from './temperature-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TemperatureService } from './services/temperature.service';
import { ViewZoneTemperatureComponent } from './temperature/view-zone-temperature/view-zone-temperature.component';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexGrid,
  ApexPlotOptions,
  ApexTooltip,
  ApexMarkers
} from 'ng-apexcharts';
import { LinechartComponent } from './Temperature/linechart/linechart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';





@NgModule({
  declarations: [ViewSiteTemperaturecomponent, ViewZoneTemperatureComponent,LinechartComponent],
  imports: [CommonModule, TemperatureRoutingModule,
     SharedModule, NgApexchartsModule,NgxChartsModule,CanvasJSAngularChartsModule],
  providers: [TemperatureService,    DatePipe 
]
})
export class TemperatureModule {}
