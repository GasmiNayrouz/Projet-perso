import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexFill
} from 'ng-apexcharts';
import { io, Socket } from 'socket.io-client'; // Import Socket type from socket.io-client
import { AlertsService } from 'src/app/demo/services/alerts.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'app-view-zone-temperature',
  templateUrl: './view-zone-temperature.component.html',
  styleUrls: ['./view-zone-temperature.component.scss']
})
export class ViewZoneTemperatureComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  socket: any; // Declare socket variable as type Socket
  Lasttemp: any;
  conn=false;
  public chartOptions: Partial<ChartOptions> |any; // Initialize chartOptions with an empty object

  constructor(private alertService:AlertsService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initSocketConnection();
    this.updateChartOptions();
   this.initSocketdisconnect();
  }

  initSocketdisconnect(): void {
    this.socket = io('http://localhost:6079');

    // Listen for the temperature_data event
    this.socket.on('disconnected', (data: any) => {
      console.log('Received temperature data:',data);
       this.conn=false
    });
  }
  initSocketConnection(): void {
    this.socket = io('http://localhost:6079');

    // Listen for the temperature_data event
    this.socket.on('temperature_data', (data: any) => {
      this.conn=true

      console.log('Received nnnnnnnnnn data:', data.MSC_CHARGUIA.POWER_ROOM[0].temperature_c);
      this.Lasttemp = data.MSC_CHARGUIA.POWER_ROOM[0].temperature_c;

      // Update chart options with new temperature data
      this.updateChartOptions();
    });
  }

  updateChartOptions(): void {
    const customColors = ['#FFFFFF', '#E91E63', '#9C27B0'];

    this.chartOptions = {
      series: [this.Lasttemp],
      chart: {
        height: 200,
        type: "radialBar",
        offsetY: -10,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -100,
          endAngle: 100,
          hollow: {
            margin: 0,
            size: "60%"
          },
          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: false
            },
            value: {
              offsetY: 8,
              fontSize: "22px",
              color: "#888",
              formatter: (val: number) => {
                return val + "°C";
              }
            }
          }
        }
      },
      fill: {
        type: 'solid',
        colors: customColors
      },
      stroke: {
        dashArray: 4
      }
    };
  }
}
