import {  HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import  { Observable } from "rxjs"

export interface DetailStock {
  id?: number
  numeroSerie: string
  date: string
  flags: string
  stock?: {
    id: number
    dateEntree: string
    numDebutStock: number
    numFinStock: number
    quantite: number
  }
}

@Injectable({
  providedIn: "root",
})
export class DetailStockService {
  private apiUrl = "http://localhost:8080/api/detail-stocks"

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token")
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    })
  }

  // Get all detail stocks
  getAllDetailStocks(): Observable<DetailStock[]> {
    return this.http.get<DetailStock[]>(this.apiUrl, { headers: this.getHeaders() })
  }

  // Get detail stock by ID
  getDetailStockById(id: number): Observable<DetailStock> {
    return this.http.get<DetailStock>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
  }

  // Get detail stocks by stock ID
  getDetailStocksByStockId(stockId: number): Observable<DetailStock[]> {
    return this.http.get<DetailStock[]>(`${this.apiUrl}/stock/${stockId}`, { headers: this.getHeaders() })
  }

  // Get detail stock by numero serie
  getDetailStockByNumeroSerie(numeroSerie: string): Observable<DetailStock> {
    return this.http.get<DetailStock>(`${this.apiUrl}/numero-serie/${numeroSerie}`, { headers: this.getHeaders() })
  }

  // Get detail stocks by flags
  getDetailStocksByFlags(flags: string): Observable<DetailStock[]> {
    return this.http.get<DetailStock[]>(`${this.apiUrl}/flags/${flags}`, { headers: this.getHeaders() })
  }

  // Update flags
  updateFlags(id: number, newFlags: string): Observable<DetailStock> {
    return this.http.put<DetailStock>(`${this.apiUrl}/${id}/flags`, newFlags, { headers: this.getHeaders() })
  }

  // Delete detail stock
  deleteDetailStock(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
  }

  // Count detail stocks by stock ID
  countDetailStocksByStockId(stockId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/stock/${stockId}`, { headers: this.getHeaders() })
  }

  // Count detail stocks by stock ID and flags
  countDetailStocksByStockIdAndFlags(stockId: number, flags: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/stock/${stockId}/flags/${flags}`, { headers: this.getHeaders() })
  }
}
