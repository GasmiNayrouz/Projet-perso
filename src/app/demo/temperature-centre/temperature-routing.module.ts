import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSiteTemperaturecomponent } from './view-site-temperature/view-site-temperature.component';

import { ViewZoneTemperatureComponent } from './temperature/view-zone-temperature/view-zone-temperature.component';


const routes: Routes = [
  {
    path: 'view-msc/:id',
    component: ViewSiteTemperaturecomponent
    
  },{

  
  path:'view-zone/:roomName',
  component: ViewZoneTemperatureComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TemperatureRoutingModule {}
