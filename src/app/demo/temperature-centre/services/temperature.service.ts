import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'; // Importez Observable et pipe depuis rxjs
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(private http: HttpClient) {}

  getSiteTemperatureData(id:string) {
    return this.http.get<any>('assets/msc-temperature.json');
  }
  getRoomTemperatureData(roomName:string): Observable<any> {
    return this.http.get<any>('assets/msc-temperature.json')
      .pipe(
        map((data: any[]) => {
          const room= data.find((room: any) => room.roomName === roomName);
          return room;
        })
      );
  }

  
}
