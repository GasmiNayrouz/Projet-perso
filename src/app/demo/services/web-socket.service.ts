import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:6079');

   }
   onTemperatureData(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('temperature_data', (data: any) => {
        observer.next(data);
      });
    });
  }
}
