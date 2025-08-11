import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  conn=false
  socket: any;
  dataPoints: any[] = [];
  timeout: any = null;
  xValue: any =Date.now();
  yValue: number = 10;
  newDataCount: number = 10;
  chart: any;

  chartOptions = {
    theme: "light2",
    title: {
      text: "Temperature"
    },
    data: [{
      type: "line",
      dataPoints: this.dataPoints
    }]
  }

  constructor() { }

  ngOnInit() {
    this.initSocketConnection();
  }
  initSocketdisconnect(): void {
    this.socket = io('http://localhost:6079');

    // Listen for the temperature_data event
    this.socket.on('disconnected', (data: any) => {
      console.log('Received temperature data:',data);
       this.conn=false
    });
  }
  initSocketConnection() {
    this.socket = io('http://localhost:6079');

    this.socket.on('temperature_data', (data: any) => {
      this.conn=true

      const temperature = data;
      console.log(temperature)
      this.addDataPoint(temperature);
    });
  }

  addDataPoint(temperature: any) {
    this.dataPoints.push({ x: new Date(temperature.MSC_CHARGUIA.POWER_ROOM[0].date), y: temperature.MSC_CHARGUIA.POWER_ROOM[0].temperature_c });
    this.chart.render();
  }

  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateData();
  }

  updateData() {
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
}
