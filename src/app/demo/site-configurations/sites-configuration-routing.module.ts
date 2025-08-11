import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSiteComponent } from './add-site/add-site.component';
import { SitesListComponent } from './sites-list/sites-list.component';
//import { ViewMscTemperaturecomponent } from './view-msc-temperature/view-msc-temperature.component';


const routes: Routes = [
  {
    path: 'new-site',
    component: AddSiteComponent
  },
  {
    path: 'view-sites',
    component: SitesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SitesConfigurationRoutingModule {}
