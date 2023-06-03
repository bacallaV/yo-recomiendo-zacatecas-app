import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import SwiperCore, { Navigation, Thumbs } from "swiper/core";

SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'app-images-in-detail',
  templateUrl: './images-in-detail.component.html',
  styleUrls: ['./images-in-detail.component.scss']
})
export class ImagesInDetailComponent {
  public thumbsSwiper: any;
}
