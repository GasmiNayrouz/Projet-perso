import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { ActivatedRoute, Router } from "@angular/router"
import  { DetailStockService, DetailStock } from "../services/detail-stock.service"
import  { StockService, Stock } from "../services/stock.service"
import  { ToastrService } from "ngx-toastr"

@Component({
  selector: "app-detail-stock",
  templateUrl: "./detail-stock.component.html",
  styleUrls: ["./detail-stock.component.scss"],
})
export class DetailStockComponent implements OnInit {
  searchForm!: FormGroup
  updateFlagsForm!: FormGroup
  detailStocks: DetailStock[] = []
  stocks: Stock[] = []
  selectedDetailStock: DetailStock | null = null
  isLoading = false
  isUpdatingFlags = false

  stockId: number | null = null
  currentStock: Stock | null = null

  // Options pour les flags
  flagsOptions = [
    { value: "V", label: "Vierge" },
    { value: "en cours de personnalisation", label: "En cours de personnalisation" },
    { value: "personnalisés", label: "Personnalisés" },
    { value: "rejetés", label: "Rejetés" },
  ]

  constructor(
    private fb: FormBuilder,
    private detailStockService: DetailStockService,
    private stockService: StockService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForms()
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.stockId = +params["id"]
        this.loadStockDetails()
        this.loadDetailStocksByStockId()
      } else {
        this.loadAllDetailStocks()
        this.loadAllStocks()
      }
    })
  }

  initializeForms(): void {
    this.searchForm = this.fb.group({
      stockId: [""],
      numeroSerie: [""],
      flags: [""],
    })

    this.updateFlagsForm = this.fb.group({
      newFlags: ["", [Validators.required]],
    })
  }

  loadAllDetailStocks(): void {
    this.isLoading = true
    this.detailStockService.getAllDetailStocks().subscribe({
      next: (detailStocks: DetailStock[]) => {
        this.detailStocks = detailStocks
        this.isLoading = false
        this.toastr.success("Détails stocks chargés avec succès", "Succès")
      },
      error: (err: any) => {
        this.isLoading = false
        this.handleError(err, "Erreur lors du chargement des détails stocks")
      },
    })
  }

  loadAllStocks(): void {
    this.stockService.getAllStocks().subscribe({
      next: (stocks: Stock[]) => {
        this.stocks = stocks
      },
      error: (err: any) => {
        this.handleError(err, "Erreur lors du chargement des stocks")
      },
    })
  }

  searchByStockId(): void {
    const stockId = this.searchForm.get("stockId")?.value
    if (stockId) {
      this.isLoading = true
      this.detailStockService.getDetailStocksByStockId(stockId).subscribe({
        next: (detailStocks: DetailStock[]) => {
          this.detailStocks = detailStocks
          this.isLoading = false
          this.toastr.success(`${detailStocks.length} détail(s) trouvé(s)`, "Recherche")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors de la recherche par stock")
        },
      })
    }
  }

  searchByNumeroSerie(): void {
    const numeroSerie = this.searchForm.get("numeroSerie")?.value
    if (numeroSerie) {
      this.isLoading = true
      this.detailStockService.getDetailStockByNumeroSerie(numeroSerie).subscribe({
        next: (detailStock: DetailStock) => {
          this.detailStocks = [detailStock]
          this.isLoading = false
          this.toastr.success("Détail trouvé", "Recherche")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors de la recherche par numéro de série")
        },
      })
    }
  }

  searchByFlags(): void {
    const flags = this.searchForm.get("flags")?.value
    if (flags) {
      this.isLoading = true
      this.detailStockService.getDetailStocksByFlags(flags).subscribe({
        next: (detailStocks: DetailStock[]) => {
          this.detailStocks = detailStocks
          this.isLoading = false
          this.toastr.success(`${detailStocks.length} détail(s) trouvé(s)`, "Recherche")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors de la recherche par flags")
        },
      })
    }
  }

  selectDetailStockForUpdate(detailStock: DetailStock): void {
    this.selectedDetailStock = detailStock
    this.isUpdatingFlags = true
    this.updateFlagsForm.patchValue({
      newFlags: detailStock.flags,
    })
  }

  updateFlags(): void {
    if (this.updateFlagsForm.valid && this.selectedDetailStock) {
      const newFlags = this.updateFlagsForm.get("newFlags")?.value

      this.isLoading = true
      this.detailStockService.updateFlags(this.selectedDetailStock.id!, newFlags).subscribe({
        next: (response: DetailStock) => {
          const index = this.detailStocks.findIndex((d) => d.id === this.selectedDetailStock!.id)
          if (index !== -1) {
            this.detailStocks[index] = response
          }
          this.cancelUpdate()
          this.isLoading = false
          this.toastr.success("Flags mis à jour avec succès", "Succès")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors de la mise à jour des flags")
        },
      })
    }
  }

  deleteDetailStock(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce détail stock ?")) {
      this.isLoading = true
      this.detailStockService.deleteDetailStock(id).subscribe({
        next: () => {
          this.detailStocks = this.detailStocks.filter((d) => d.id !== id)
          this.isLoading = false
          this.toastr.success("Détail stock supprimé avec succès", "Succès")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors de la suppression du détail stock")
        },
      })
    }
  }

  cancelUpdate(): void {
    this.isUpdatingFlags = false
    this.selectedDetailStock = null
    this.updateFlagsForm.reset()
  }

  resetSearch(): void {
    this.searchForm.reset()
    this.loadAllDetailStocks()
  }

  loadStockDetails(): void {
    if (this.stockId) {
      this.stockService.getStockById(this.stockId).subscribe({
        next: (stock: Stock) => {
          this.currentStock = stock
        },
        error: (err: any) => {
          this.handleError(err, "Erreur lors du chargement du stock")
          this.router.navigate(["/stock"])
        },
      })
    }
  }

  loadDetailStocksByStockId(): void {
    if (this.stockId) {
      this.isLoading = true
      this.detailStockService.getDetailStocksByStockId(this.stockId).subscribe({
        next: (detailStocks: DetailStock[]) => {
          this.detailStocks = detailStocks
          this.isLoading = false
          this.toastr.success(`${detailStocks.length} détail(s) chargé(s)`, "Succès")
        },
        error: (err: any) => {
          this.isLoading = false
          this.handleError(err, "Erreur lors du chargement des détails stocks")
        },
      })
    }
  }

  goBackToStocks(): void {
    this.router.navigate(["/stock"])
  }

  getFlagsBadgeClass(flags: string): string {
    switch (flags) {
      case "V":
        return "bg-secondary"
      case "en cours de personnalisation":
        return "bg-warning"
      case "personnalisés":
        return "bg-success"
      case "rejetés":
        return "bg-danger"
      default:
        return "bg-secondary"
    }
  }

  getFlagsLabel(flags: string): string {
    const option = this.flagsOptions.find((opt) => opt.value === flags)
    return option ? option.label : flags
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
