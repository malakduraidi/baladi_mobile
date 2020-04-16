import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IResPartner} from "../../models/res-partner";

@Component({
  selector: "res-partner-select-item",
  templateUrl: "res-partner-select-item.html"
})
export class ResPartnerSelectItemComponent {
  @Input() resPartner: IResPartner;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IResPartner> ();

  select(resPartner: IResPartner) {
    this.objEmitter.emit(resPartner);
  }
}
