import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  // Événement pour basculer le menu latéral principal
  @Output() NavCollapse = new EventEmitter<void>();
  // Si vous utilisez aussi NavCollapsedMob pour autre chose, laissez-le
  // @Output() NavCollapsedMob = new EventEmitter<void>();

  constructor() {}

  // Méthode appelée quand on clique sur le bouton hamburger principal (gauche)
  onNavCollapse() {
    console.log('[NavBarComponent] onNavCollapse() appelé. Émission de l\'événement NavCollapse.');
    // Cet événement signifie : "L'utilisateur veut basculer le menu latéral"
    this.NavCollapse.emit();
  }

  // Si vous avez un bouton mobile séparé ou utilisez NavCollapsedMob différemment
  // onNavCollapsedMob() {
  //   console.log('[NavBarComponent] onNavCollapsedMob() appelé. Émission de l\'événement NavCollapsedMob.');
  //   this.NavCollapsedMob.emit();
  // }
}
