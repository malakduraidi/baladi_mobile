import { Component, Output, Input, EventEmitter } from "@angular/core";
import { IResPartner} from "../../models/res-partner";

@Component({
  selector: "res-partner-item",
  templateUrl: "res-partner-item.html",
  styleUrls: ['./res-partner-item.scss']
})
export class ResPartnerItemComponent {
  @Input() resPartner: IResPartner;

  constructor() { }

  @Output() objEmitter = new EventEmitter < IResPartner> ();

  select(resPartner: IResPartner) {
    this.objEmitter.emit(resPartner);
  }
}
