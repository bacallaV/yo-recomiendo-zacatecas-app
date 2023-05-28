import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-promotions-banner',
  templateUrl: './promotions-banner.component.html',
  styleUrls: ['./promotions-banner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PromotionsBannerComponent {
  array = ['a', 'b', 'c'];
}
