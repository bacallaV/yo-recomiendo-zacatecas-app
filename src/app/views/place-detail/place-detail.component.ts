import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
/* Components */
import { ImagesInDetailComponent } from 'src/app/components/images-in-detail/images-in-detail.component';
/* Models */
import { EventModel } from 'src/app/models/event.model';
/* Static */
import { exampleEventModel } from 'src/app/static/event.static';

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

  public featuredEvent: EventModel = exampleEventModel;

  constructor(
    private dialog: MatDialog,
  ){
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
