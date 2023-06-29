import { Component, Input } from '@angular/core';
/* Models */
import { Place } from './../../models/place.model';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})
export class PlaceCardComponent {
  @Input() place!: Place;
}
