import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/* Models */
import { EventModel } from 'src/app/models/event.model';
/* Static */
import { exampleEventModel } from 'src/app/static/event.static';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  public eventModel: EventModel | null = null;

  public areMoreServicesShown = false;
  constructor(
    private activatedRoute: ActivatedRoute,
  ){
  }

  ngOnInit(): void {
    this.checkForRouteQueryParams();
  }

  private checkForRouteQueryParams(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const webId = params.get('webId');

      if( !webId ) return;

      this.eventModel = exampleEventModel;
      this.eventModel.webId = webId;
      this.eventModel.name = webId.charAt(0).toUpperCase() + webId.split('-').join(' ').substring(1);

    });

  }

  public toggleShowMoreServices(): void {
    this.areMoreServicesShown = !this.areMoreServicesShown;
  }

  public redirectTo(url: string): void {
    window.open(url, '_blank');
  }
}
