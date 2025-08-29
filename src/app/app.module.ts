// Angular Import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './demo/login/login.component';
import { AuthInterceptor } from './demo/services/auth.interceptor';
import { LogsComponent } from './demo/logs/logs/logs.component';
import { StockComponent } from './demo/stock/stock.component';
import { DocumentComponent } from './demo/document/document.component';
import { ProductionComponent } from './demo/production/production.component';
import { QualiteComponent } from './demo/qualite/qualite.component';
import { DetailStockComponent } from './demo/detail-stock/detail-stock.component';





@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GuestComponent,
    NavBarComponent,
    NavigationComponent,
    NavRightComponent,
    NavContentComponent,
    NavItemComponent,
    NavCollapseComponent,
    NavGroupComponent,
    LoginComponent,
    LogsComponent,
    StockComponent,
    DocumentComponent,
    ProductionComponent,
    QualiteComponent,
    DetailStockComponent,
   
    
    





  ],
  imports: [HttpClientModule,BrowserModule, AppRoutingModule, SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
     RouterModule,
     
     ToastrModule.forRoot() // ToastrModule added

    ],
  providers: [
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
