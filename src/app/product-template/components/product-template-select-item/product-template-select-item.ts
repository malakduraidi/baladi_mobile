import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IProductTemplate} from "../../models/product-template";

@Component({
  selector: "product-template-select-item",
  templateUrl: "product-template-select-item.html"
})
export class ProductTemplateSelectItemComponent {
  @Input() productTemplate: IProductTemplate;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IProductTemplate> ();

  select(productTemplate: IProductTemplate) {
    this.objEmitter.emit(productTemplate);
  }
}
