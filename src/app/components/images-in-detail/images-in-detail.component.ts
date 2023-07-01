import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import SwiperCore, { Navigation, Thumbs } from "swiper/core";

SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'app-images-in-detail',
  templateUrl: './images-in-detail.component.html',
  styleUrls: ['./images-in-detail.component.scss']
})
export class ImagesInDetailComponent {
  public thumbsSwiper: any;
  public gallery: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {
    this.gallery = data;
  }
}
