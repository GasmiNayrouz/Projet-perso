import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesListComponent } from './sites-list/sites-list.component';
import { AddSiteComponent } from './add-site/add-site.component';
import { FormsModule } from '@angular/forms';
import { SitesConfigurationRoutingModule } from './sites-configuration-routing.module';
import { SitesService } from './services/sites.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [SitesListComponent, AddSiteComponent],
  imports: [CommonModule, FormsModule, SitesConfigurationRoutingModule,SharedModule],
  providers: [SitesService]
})
export class SiteConfigurationsModule {}
