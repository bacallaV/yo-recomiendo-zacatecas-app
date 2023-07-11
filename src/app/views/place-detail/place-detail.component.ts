import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
/* Components */
import { ImagesInDetailComponent } from 'src/app/components/images-in-detail/images-in-detail.component';
import { Category } from 'src/app/models/category.model';
/* Models */
import { EventModel } from 'src/app/models/event.model';
import { Place } from 'src/app/models/place.model';
import { Promotion } from 'src/app/models/promotion.model';
import { FirebaseServiceService } from 'src/app/services/firebase-service/firebase-service.service';
/* Static */
import { exampleEventModel } from 'src/app/static/event.static';
import { examplePlace } from 'src/app/static/place.static';
import { examplePromotion } from 'src/app/static/promotion.static';

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

  public errors = {
    place: { isErrorActive: false, message: '' },
    featuredPromotions: { isErrorActive: false, message: '' },
  };
  public place: Place | undefined;
  public category: Category | undefined;
  public featuredPromotions: Promotion[] = [];

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseServiceService,
  ){
    this.imagesDialogProperties.maxWidth = '90vw';
    this.imagesDialogProperties.panelClass = 'custom-dialog';
  }

  ngOnInit(): void {
    this.readQueryAndGetPlace();
    this.getFeaturedPromotions();
  }

  public readQueryAndGetPlace() {
    this.activatedRoute.paramMap.subscribe(params => {
      const placeId = params.get('webId');

      // if( !placeId || Math.random() < 0.25 ) {
      //   this.errors.place = { isErrorActive: true, message: 'No se encontró el lugar' };
      //   return;
      // }

      this.firebaseService.getPlacesByUrl(placeId ?? '').subscribe(data => {
        this.place = data[0];
        this.getCategoryById(this.place.idCategory);
      });

    });
  }

  public getCategoryById(id: string): void {
    this.firebaseService.getAllCategories().subscribe(data => {
      this.category = data.find(c => c.id === id);
    });
  }

  public getFeaturedPromotions(): void {
    if( Math.random () < 0.2 ) {
      this.errors.featuredPromotions = {
        isErrorActive: true,
        message: 'No se econtraron lugares destacados',
      }
      return;
    }

    this.featuredPromotions = [
      examplePromotion,
      examplePromotion,
      examplePromotion,
      examplePromotion,
    ];
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
    this.imagesDialogProperties.data = this.place?.gallery;
    this.dialog.open( ImagesInDetailComponent, this.imagesDialogProperties );
  }
  /* / UI Functions */
}
