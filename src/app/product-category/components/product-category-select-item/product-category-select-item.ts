import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IProductCategory} from "../../models/product-category";

@Component({
  selector: "product-category-select-item",
  templateUrl: "product-category-select-item.html"
})
export class ProductCategorySelectItemComponent {
  @Input() productCategory: IProductCategory;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IProductCategory> ();

  select(productCategory: IProductCategory) {
    this.objEmitter.emit(productCategory);
  }
}
