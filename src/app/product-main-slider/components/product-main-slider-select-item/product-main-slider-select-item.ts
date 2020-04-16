import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IProductMainSlider} from "../../models/product-main-slider";

@Component({
  selector: "product-main-slider-select-item",
  templateUrl: "product-main-slider-select-item.html"
})
export class ProductMainSliderSelectItemComponent {
  @Input() productMainSlider: IProductMainSlider;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IProductMainSlider> ();

  select(productMainSlider: IProductMainSlider) {
    this.objEmitter.emit(productMainSlider);
  }
}
