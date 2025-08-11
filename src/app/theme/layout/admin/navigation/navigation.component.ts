import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  windowWidth: number = 0;

  @Output() NavCollapsedMob = new EventEmitter<void>();

  constructor() {
    this.windowWidth = window.innerWidth;
  }

  onNavCollapse() {
    // Do nothing to prevent toggle
    console.log('[NavigationComponent] onNavCollapse() called, but sidebar is static.');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth;
  }
}