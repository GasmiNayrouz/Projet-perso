import { Component, type OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { Router } from "@angular/router"
import  { StockService, Stock } from "../services/stock.service"
import  { ToastrService } from "ngx-toastr"

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
})
export class StockComponent implements OnInit {
  stockForm!: FormGroup
  searchForm!: FormGroup
  stocks: Stock[] = []
  selectedStock: Stock | null = null
  isLoading = false
  isEditing = false

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForms()
    this.loadAllStocks()
  }

  initializeForms(): void {
    this.stockForm = this.fb.group({
      dateEntree: ["", [Validators.required]],
      numDebutStock: ["", [Validators.required, Validators.min(0)]],
      numFinStock: ["", [Validators.required, Validators.min(0)]],
    })

    this.searchForm = this.fb.group({
      searchDate: [""],
      startDate: [""],
      endDate: [""],
    })
  }

  loadAllStocks(): void {
    this.isLoading = true
    this.stockService.getAllStocks().subscribe({
      next: (stocks: Stock[]) => {
        this.stocks = stocks
        this.isLoading = false
        this.toastr.success("Stocks chargés avec succès", "Succès")
      },
      error: (err: any) => {
        this.isLoading = false
        this.handleError(err, "Erreur lors du chargement des stocks")
      },
    })
  }

  createStock(): void {
    if (this.stockForm.valid) {
      const stockData: Stock = this.stockForm.value

      // Validation métier
      if (stockData.numFinStock < stockData.numDebutStock) {
        this.toastr.error("Le numéro de fin doit être supérieur ou égal au numéro de début", "Erreur")
        return
      }

      this.isLoading = true
      this.stockService.createStock(stockData).subscribe({
        next: (response: Stock) => {
          this.stocks.push(response)
          this.stockForm.reset()
          this.isLoading = false
          this.toastr.success("Stock créé avec succès", "Succès")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors de la création du stock")
        },
      })
    } else {
      this.toastr.warning("Veuillez remplir tous les champs correctement", "Formulaire invalide")
    }
  }

  editStock(stock: Stock): void {
    this.selectedStock = stock
    this.isEditing = true
    this.stockForm.patchValue({
      dateEntree: stock.dateEntree,
      numDebutStock: stock.numDebutStock,
      numFinStock: stock.numFinStock,
    })
  }

  updateStock(): void {
    if (this.stockForm.valid && this.selectedStock) {
      const stockData: Stock = this.stockForm.value

      // Validation métier
      if (stockData.numFinStock < stockData.numDebutStock) {
        this.toastr.error("Le numéro de fin doit être supérieur ou égal au numéro de début", "Erreur")
        return
      }

      this.isLoading = true
      this.stockService.updateStock(this.selectedStock.id!, stockData).subscribe({
        next: (response: Stock) => {
          const index = this.stocks.findIndex((s) => s.id === this.selectedStock!.id)
          if (index !== -1) {
            this.stocks[index] = response
          }
          this.cancelEdit()
          this.isLoading = false
          this.toastr.success("Stock mis à jour avec succès", "Succès")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors de la mise à jour du stock")
        },
      })
    }
  }

  deleteStock(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce stock ?")) {
      this.isLoading = true
      this.stockService.deleteStock(id).subscribe({
        next: () => {
          this.stocks = this.stocks.filter((s) => s.id !== id)
          this.isLoading = false
          this.toastr.success("Stock supprimé avec succès", "Succès")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors de la suppression du stock")
        },
      })
    }
  }

  searchByDate(): void {
    const searchDate = this.searchForm.get("searchDate")?.value
    if (searchDate) {
      this.isLoading = true
      this.stockService.getStocksByDate(searchDate).subscribe({
        next: (stocks: Stock[]) => {
          this.stocks = stocks
          this.isLoading = false
          this.toastr.success(`${stocks.length} stock(s) trouvé(s)`, "Recherche")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors de la recherche par date")
        },
      })
    }
  }

  searchByDateRange(): void {
    const startDate = this.searchForm.get("startDate")?.value
    const endDate = this.searchForm.get("endDate")?.value

    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        this.toastr.error("La date de début doit être antérieure à la date de fin", "Erreur")
        return
      }

      this.isLoading = true
      this.stockService.getStocksByDateRange(startDate, endDate).subscribe({
        next: (stocks: Stock[]) => {
          this.stocks = stocks
          this.isLoading = false
          this.toastr.success(`${stocks.length} stock(s) trouvé(s)`, "Recherche")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors de la recherche par plage de dates")
        },
      })
    } else {
      this.toastr.warning("Veuillez sélectionner les deux dates", "Recherche incomplète")
    }
  }

  cancelEdit(): void {
    this.isEditing = false
    this.selectedStock = null
    this.stockForm.reset()
  }

  resetSearch(): void {
    this.searchForm.reset()
    this.loadAllStocks()
  }

  viewStockDetails(stockId: number): void {
    this.router.navigate(["/detail-stock", stockId])
  }

  private handleError(err: any, defaultMessage: string): void {
    let errorMessage = defaultMessage

    if (err) {
      if (err.status === 403) {
        errorMessage = "Accès refusé. Vérifiez vos permissions."
      } else if (err.status === 0) {
        errorMessage = "Erreur réseau. Vérifiez votre connexion."
      } else if (err.status >= 500) {
        errorMessage = "Erreur serveur. Veuillez réessayer plus tard."
      } else if (err.error && typeof err.error === "string") {
        errorMessage = err.error
      } else if (err.error && err.error.message) {
        errorMessage = err.error.message
      }
    }

    this.toastr.error(errorMessage, "Erreur")
  }
}
