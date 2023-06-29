import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
/* Components */
import { ImagesInDetailComponent } from 'src/app/components/images-in-detail/images-in-detail.component';
/* Models */
import { EventModel } from 'src/app/models/event.model';
import { Place } from 'src/app/models/place.model';
/* Static */
import { exampleEventModel } from 'src/app/static/event.static';
import { examplePlace } from 'src/app/static/place.static';

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

  public error: {} | null = null;
  public place: Place | undefined;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ){
    this.imagesDialogProperties.maxWidth = '90vw';
    this.imagesDialogProperties.panelClass = 'custom-dialog';
  }

  ngOnInit(): void {
    this.readQueryAndGetPlace();
  }

  public readQueryAndGetPlace() {
    this.activatedRoute.paramMap.subscribe(params => {
      const placeId = params.get('webId');

      if( !placeId || Math.random() < 0.25 ) {
        this.error = { active: true, message: 'No se encontró el lugar' };
        return;
      }

      this.place = examplePlace;
    });
  }

  public redirectTo(url: string): void {
    window.open(url, '_blank');
  }

  /* UI Functions */
  public toggleShowMoreServices(): void {
    this.areMoreServicesShown = !this.areMoreServicesShown;
  }

  public toggleShowMoreDescription(): void {
    this.isMoreDescriptionShown = !this.isMoreDescriptionShown;
  }

  public showAllImages(): void {
    this.dialog.open( ImagesInDetailComponent, this.imagesDialogProperties );
  }
  /* / UI Functions */
}
