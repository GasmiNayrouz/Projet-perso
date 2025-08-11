// angular import
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@Component({
  selector: 'app-Temperature',
  standalone: true,
  imports: [CommonModule, SharedModule ],
  templateUrl: './Temperature.component.html',
  styleUrls: ['./Temperature.component.scss']
})
export default class TemperatureComponent {

}

