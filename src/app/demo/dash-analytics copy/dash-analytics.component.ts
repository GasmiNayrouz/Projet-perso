// angular import
import { Component, ViewChild,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';


// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DashbaordService } from './dashbaord.service';
import { AlertsService } from '../services/alerts.service';
import { io } from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [CommonModule, SharedModule,],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss'],
  providers: [DashbaordService]
})
export default class DashAnalyticsComponent {
 

}
