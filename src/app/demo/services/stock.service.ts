import {  HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

export interface Stock {
  id?: number
  dateEntree: string
  numDebutStock: number
  numFinStock: number
  quantite?: number
  dateCreation?: string
  dateModification?: string
}

@Injectable({
  providedIn: "root",
})
export class StockService {
  private apiUrl = "http://localhost:8080/stocks"

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token")
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    })
  }

  // Create stock
  createStock(stock: Stock): Observable<any> {
    return this.http.post<any>(this.apiUrl, stock, { headers: this.getHeaders() })
  }

  // Get all stocks
  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl, { headers: this.getHeaders() })
  }

  // Get stock by ID
  getStockById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
  }

  // Get stocks by date
  getStocksByDate(date: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/date/${date}`, { headers: this.getHeaders() })
  }

  // Get stocks by date range
  getStocksByDateRange(startDate: string, endDate: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/date-range?startDate=${startDate}&endDate=${endDate}`, {
      headers: this.getHeaders(),
    })
  }

  // Update stock
  updateStock(id: number, stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrl}/${id}`, stock, { headers: this.getHeaders() })
  }

  // Delete stock
  deleteStock(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
  }
}
