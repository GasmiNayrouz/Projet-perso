// angular import
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemperatureService } from '../services/temperature.service';
import { io } from 'socket.io-client';


interface ProgressBarItem {
  value: string;
  color: string;
  percentage: number;
}

@Component({
  selector: 'app-view-site-temperature',
  templateUrl: './view-site-temperature.component.html',
  styleUrls: ['./view-site-temperature.component.scss']
})
export class ViewSiteTemperaturecomponent {
  // public method
  mscName: any;
  roomName: any;
  siteTemperatureData: any;
   // public method
socket:any
temperature:any;

  constructor(
    private route: ActivatedRoute,
    private temperatureService: TemperatureService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.mscName = params['id'];
      // Now you can use this.productId to fetch product details or perform any other action.
    });
    this.loadTemperatureData();
    this.initSocketConnection()
  }

  loadTemperatureData(): void {
    // Example of using the DataService to load data
    this.temperatureService.getSiteTemperatureData(this.mscName).subscribe((data: any) => {
      if (data) {
        this.siteTemperatureData = data;
        this.areaList = this.retriveAreaList();
        console.log('arealist1',this.areaList)
        this.areaList.pop();
        console.log('arealist after removing last element', this.areaList);

      }
      // Handle the loaded data
    });
  }
  retriveAreaList() {
    // Array to store all area names
    const areaNames: any = [];

    // Loop through each object in the data array
    this.siteTemperatureData.forEach((obj: any) => {
      // Loop through each areaData object within the current object
      obj.areaData.forEach((area: any) => {
        // Check if the areaName already exists in the areaNames array
        if (!areaNames.includes(area.areaName)) {
          // If it doesn't exist, push it into the areaNames array
          areaNames.push(area?.areaName);
        }
      });
    });

    console.log(areaNames);
    return areaNames;
  }
  getAreaTemperature(areaName: string, areaData: any): any {
    if (areaData) {
      for (const item of areaData) {
        if (item?.areaName === areaName) {

          return item?.temperature;
        }
      }
    }
    return 'N/A';
  }
  initSocketConnection(): void {
    this.socket = io('http://localhost:6079');

    // Listen for the temperature_data event
    this.socket.on('temperature_data', (data: any) => {

      this.temperature = data.MSC_CHARGUIA.POWER_ROOM[0].temperature_c


    });
  }
  areaList: any = [];

  roomList = [{}];
  progressBar: ProgressBarItem[] = [
    {
      value: '786',
      color: 'danger',
      percentage: 60
    },
    {
      value: '485',
      color: 'primary',
      percentage: 50
    },
    {
      value: '769',
      color: 'warning',
      percentage: 70
    },
    {
      value: '45,3%',
      color: 'success',
      percentage: 60
    },
    {
      value: '6,7%',
      color: 'info',
      percentage: 30
    },
    {
      value: '8,56',
      color: 'danger',
      percentage: 40
    },
    {
      value: '10:55',
      color: 'warning',
      percentage: 70
    },
    {
      value: '33.8%',
      color: 'success',
      percentage: 40
    }
  ];
}
