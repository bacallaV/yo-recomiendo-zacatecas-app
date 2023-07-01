import { Component, Input } from '@angular/core';
/* Models */
import { EventModel } from './../../models/event.model';

@Component({
  selector: 'app-event-banner',
  templateUrl: './event-banner.component.html',
  styleUrls: ['./event-banner.component.scss']
})
export class EventBannerComponent {
  @Input() eventModel: EventModel | undefined | null;
}
