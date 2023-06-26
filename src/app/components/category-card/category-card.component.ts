import { Component, EventEmitter, Input, Output } from '@angular/core';
/* Models */
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Input() isFilterActive: boolean = false;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  public onClickedCategory() {
    this.onClick.emit();
  }
}
