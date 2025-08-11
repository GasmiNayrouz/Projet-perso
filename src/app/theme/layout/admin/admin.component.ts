import { Component, HostListener } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  navCollapsed = false; // Set to false to avoid navbar-collapsed class
  navCollapsedMob = false; // Mobile toggle disabled
  windowWidth: number;

  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {
    this.windowWidth = window.innerWidth;
  }

  navMobClick() {
    // Do nothing to prevent toggle
    console.log('[AdminComponent] navMobClick() called, but sidebar is static.');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    const oldWidth = this.windowWidth;
    this.windowWidth = window.innerWidth;
    console.log('[AdminComponent] Window size changed:', this.windowWidth);

    // Handle transition from mobile to desktop
    if (oldWidth < 992 && this.windowWidth >= 992) {
      this.navCollapsedMob = false; // Ensure mobile menu is closed
    }
    // Handle transition from desktop to mobile
    else if (oldWidth >= 992 && this.windowWidth < 992) {
      this.navCollapsed = false; // Ensure sidebar remains open
    }
  }
}