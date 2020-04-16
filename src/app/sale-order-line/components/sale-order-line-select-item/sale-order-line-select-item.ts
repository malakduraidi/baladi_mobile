import { Component, Output, Input, EventEmitter } from "@angular/core";
import { ISaleOrderLine} from "../../models/sale-order-line";

@Component({
  selector: "sale-order-line-select-item",
  templateUrl: "sale-order-line-select-item.html"
})
export class SaleOrderLineSelectItemComponent {
  @Input() saleOrderLine: ISaleOrderLine;

  constructor() { }

  @Output() objEmitter = new EventEmitter < ISaleOrderLine> ();

  select(saleOrderLine: ISaleOrderLine) {
    this.objEmitter.emit(saleOrderLine);
  }
}
