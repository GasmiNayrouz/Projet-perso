// angular import
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AlertsService } from '../services/alerts.service';



@Component({
  selector: 'app-alerts',

  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export default class AlertsComponent {
  alerts:any[]=[];
  constructor(private alertservice:AlertsService){}
  ngOnInit(): void {
    this.getAll();

  }
  getAll(){
    this.alertservice.getAlerts().subscribe(res=>{
      this.alerts=res;
    })
  }
}
