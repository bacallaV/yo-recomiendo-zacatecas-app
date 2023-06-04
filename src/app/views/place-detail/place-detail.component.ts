import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ImagesInDetailComponent } from 'src/app/components/images-in-detail/images-in-detail.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlaceDetailComponent implements OnInit {

  public areMoreServicesShown = false;
  public isMoreDescriptionShown = false;

  private imagesDialogProperties = new MatDialogConfig();

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private dialog: MatDialog,
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

    this.imagesDialogProperties.maxWidth = '90vw';
    this.imagesDialogProperties.panelClass = 'custom-dialog';
  }

  ngOnInit(): void {
  }

  public toggleShowMoreServices(): void {
    this.areMoreServicesShown = !this.areMoreServicesShown;
  }

  public toggleShowMoreDescription(): void {
    this.isMoreDescriptionShown = !this.isMoreDescriptionShown;
  }

  public showAllImages(): void {
    this.dialog.open( ImagesInDetailComponent, this.imagesDialogProperties );
  }
}
