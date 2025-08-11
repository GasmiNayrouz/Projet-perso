import { Component } from '@angular/core';
import { SitesService } from '../services/sites.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.scss']
})
export class SitesListComponent {
  constructor(private siteService:SitesService , private toastr: ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.siteService.getMyOoredooRapport;
  

  }
  getllUser(){
    this.siteService.getMyOoredooRapport().subscribe(
    )
   }
}
