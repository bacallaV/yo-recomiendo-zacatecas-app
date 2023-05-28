import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-banner',
  templateUrl: './event-banner.component.html',
  styleUrls: ['./event-banner.component.scss']
})
export class EventBannerComponent {
  @Input() title: string = 'Evento';
  @Input() description: string = 'No contiene una descripción';
}
