import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private baseUrl = 'http://146.59.237.231:8096';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/history`);
  }
}
