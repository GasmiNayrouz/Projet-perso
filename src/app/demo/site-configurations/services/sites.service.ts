import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  saveSite(siteData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sites/newSite`, siteData)
  }

  fetchSites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/fetch`);
  }
  getMyOoredooRapport (){
    return this.http.get<any[]>("http://localhost:8089/api/rapport/allMyooredoo");
  }
}
