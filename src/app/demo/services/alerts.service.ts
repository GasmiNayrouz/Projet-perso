import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user-management/components/modeles/user.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private apiUrl = 'http://localhost:3000/'; // Assurez-vous de remplacer 'your-api-url' par l'URL réelle de votre API

  constructor(private http: HttpClient) { }

  getAlerts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}alerts/all`);
  }
  getLastTemp(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}temp/last`);
  }
}
