import { Component, Output, Input, EventEmitter } from "@angular/core";
import { ISaleOrderLine} from "../../models/sale-order-line";

@Component({
  selector: "sale-order-line-item",
  templateUrl: "sale-order-line-item.html",
  styleUrls: ['./sale-order-line-item.scss']
})
export class SaleOrderLineItemComponent {
  @Input() saleOrderLine: ISaleOrderLine;

  constructor() { }

  @Output() objEmitter = new EventEmitter < ISaleOrderLine> ();

  select(saleOrderLine: ISaleOrderLine) {
    this.objEmitter.emit(saleOrderLine);
  }
}
