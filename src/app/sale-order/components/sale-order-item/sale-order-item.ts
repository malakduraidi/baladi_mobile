import { Component, Output, Input, EventEmitter } from "@angular/core";
import { ISaleOrder} from "../../models/sale-order";

@Component({
  selector: "sale-order-item",
  templateUrl: "sale-order-item.html",
  styleUrls: ['./sale-order-item.scss']
})
export class SaleOrderItemComponent {
  @Input() saleOrder: ISaleOrder;

  constructor() { }

  @Output() objEmitter = new EventEmitter < ISaleOrder> ();

  select(saleOrder: ISaleOrder) {
    this.objEmitter.emit(saleOrder);
  }
}
