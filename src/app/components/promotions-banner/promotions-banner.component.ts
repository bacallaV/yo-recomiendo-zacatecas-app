import { Component, Input, ViewEncapsulation } from '@angular/core';
/* Models */
import { Promotion } from 'src/app/models/promotion.model';

@Component({
  selector: 'app-promotions-banner',
  templateUrl: './promotions-banner.component.html',
  styleUrls: ['./promotions-banner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PromotionsBannerComponent {
  @Input() promotions!: Promotion[];
}
