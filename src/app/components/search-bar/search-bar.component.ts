import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() locateSearchButtonAtBottom: boolean = false;
  @Input() initialValue: string = '';
  @Input() placeHolder: string = 'Buscar lugar';

  public query: string = '';
  public zone: string = '';

  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.query = this.initialValue;
  }

  public search(): void {
    this.onSearch.emit({
      query: this.query,
      zone: this.zone,
    });
  }
}
