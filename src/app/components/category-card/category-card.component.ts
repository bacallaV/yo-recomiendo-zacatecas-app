import { Component, EventEmitter, Input, Output } from '@angular/core';
import { dataCardCategoria } from 'src/app/interfaces/data-card-categoria.interface';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category!: dataCardCategoria;
  @Input() isFilterActive: boolean = false;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  public onClickedCategory() {
    this.onClick.emit();
  }
}
