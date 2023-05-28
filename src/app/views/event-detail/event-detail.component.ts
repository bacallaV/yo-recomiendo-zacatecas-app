import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
  ){
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
