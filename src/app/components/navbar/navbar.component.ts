import { Component, OnInit } from '@angular/core';

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {

    this.matIconRegistry.addSvgIcon(
      `app-menu`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/menu.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `facebook`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/facebook.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `instagram`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/instagram.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `youtube`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/youtube.svg`)
    );
  }

  ngOnInit(): void {
  }

}
