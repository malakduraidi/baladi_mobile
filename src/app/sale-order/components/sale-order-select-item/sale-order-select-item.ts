import { Component, Output, Input, EventEmitter } from "@angular/core";
import { ISaleOrder} from "../../models/sale-order";

@Component({
  selector: "sale-order-select-item",
  templateUrl: "sale-order-select-item.html"
})
export class SaleOrderSelectItemComponent {
  @Input() saleOrder: ISaleOrder;

  constructor() { }

  @Output() objEmitter = new EventEmitter < ISaleOrder> ();

  select(saleOrder: ISaleOrder) {
    this.objEmitter.emit(saleOrder);
  }
}
