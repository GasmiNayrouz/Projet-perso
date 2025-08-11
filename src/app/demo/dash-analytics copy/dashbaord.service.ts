import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashbaordService {
  constructor(private http: HttpClient) {}

  getTemperatureAnalytics() {
    return this.http.get<any>('assets/temperature.json');
  }
}
